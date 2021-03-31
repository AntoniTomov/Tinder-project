const getAllUsers = (users) => {
    return {
        type: 'getAllUsers',
        payload: users,
    }
}
export default getAllUsers;