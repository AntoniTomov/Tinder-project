const initialState = [];

const allUsersReducer = (state = initialState, action) => {
    switch (action.type){
        case 'getAllUsers':
            return [
                ...action.payload,
            ]
        case 'resetAllUsers':
            return initialState;
        default:
            return state;
    }
}
export default allUsersReducer;