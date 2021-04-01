const initialState = null;

const userReducer = (state = initialState, action) => {

    switch (action.type){
        // nice!!!
        case 'userLoggedIn':
            return {
                ...state,
                user: action.payload,
            }
        case 'userLoggedOut':
            return null
        default:
            return state;
    }
}
export default userReducer;