const removeId = (userId) => {
    return {
        type: 'addToRemoved',
        payload: userId,
    }
}
export default removeId;