const loginUser = (user) => {
    return {
        type: 'userLoggedIn',
        payload: user
    }
}
export default loginUser;