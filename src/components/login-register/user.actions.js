export const updateUserInfo = (diff, prop) => {

    return (dispatch, getState) => {
        let user = getState().currentUser;
        user[prop] = diff;
        dispatch({ type: 'updateProfile', payload: user })
    }
}

export const changeUserData = (action, id, prop) => {

    return (dispatch, getState) => {
        let user = getState().currentUser;
        let data = user[prop];
        if (action === 'add') {
            data.push(id)
        } else {
            data = data.filter(user => user.uid !== id)
        }
        dispatch({ type: 'changeUserData', payload: user })
    }
}