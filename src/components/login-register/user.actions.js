export const updateUserInfo = (diff, prop) => {

    return (dispatch, getState) => {
        let user = getState().currentUser;
        user[prop] = diff;
        dispatch({ type: 'updateProfile', payload: user })
    }
}

// Check if you need this function:

export const changeUserData = (arrProp, id) => {

    return (dispatch, getState) => {
        let user = getState().currentUser;
        let data = user[arrProp];
        data.push(id)
        dispatch({ type: 'changeUserData', payload: user })
    }
}