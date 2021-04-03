const initialState = [];

const allUsersReducer = (state = initialState, action) => {
    switch (action.type){
        case 'getAllUsers':
            return [
                ...action.payload,
            ]
        default:
            return state;
    }
}
export default allUsersReducer;