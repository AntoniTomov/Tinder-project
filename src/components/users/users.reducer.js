// const initialState = [];
const initialState = {
    allUsers: [],
    error: null,
}

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAllUsers':
            return {
                ...state,
                allUsers: action.payload
            }
        case 'updateAllUsers':
            return {
                ...state,
                allUsers: action.payload,
                error: null
            }
        case 'updateAllUsersError': 
            return {
                ...state,
                error: action.payload
            }
        case 'resetAllUsers':
            return initialState;
        default:
            return state;
    }
}
export default allUsersReducer;