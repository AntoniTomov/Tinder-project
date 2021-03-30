const initialState = {
    userEmail: '',
    userId: '',
    userProfilePic: '',
    userFullName: '',
};

const reducer = (state = initialState, action) => {

    switch (action.type){
        // nice!!!
        case 'userLoggedIn':
            return {
                ...state,
                userId: action.payload.uid,
            }
        case 'userLoggedOut':
            return {
                ...state,
                userId: ''
            }
        default:
            return state;
    }
}
export default reducer;