const initialState = null;

const allUsersReducer = (state = initialState, action) => {
    switch (action.type){
        case 'getAllUsers':
            return {
                ...state,
                allUsers: action.payload,
            }
        default:
            return state;
    }
}
export default allUsersReducer;