import firebase, { db } from '../../firebase';

export const updateAllUsers = (userOneId, userTwoId) => {
    console.log('===================> IZPYLNIH SE')

    return (dispatch, getState) => {

        let two = db.collection('users').doc(userTwoId).update({
            matches: firebase.firestore.FieldValue.arrayUnion(userOneId),
        })
        let one = db.collection('users').doc(userOneId).update({
            matches: firebase.firestore.FieldValue.arrayUnion(userTwoId),
        })

        Promise.all([two, one])
            .then(() => {
                let updatedUsers = getState().allUsers.allUsers
                let afterUpdate = updatedUsers.map(user => {
                    if (user.uid === userTwoId) {
                        user.matches = [...user.matches, userOneId];
                    }
                    if (user.uid === userOneId) {
                        user.matches = [...user.matches, userTwoId];
                    }
                    return user;
                });
                dispatch({ type: 'updateAllUsers', payload: afterUpdate });
            })
            .catch(err => {
                dispatch({ type: 'updateAllUsersError', payload: `${err.name}: ${err.code} ${err.message}` })
            })
    }

}