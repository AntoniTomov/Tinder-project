const initialState = null;

const userReducer = (state = initialState, action) => {

    switch (action.type){
        // nice!!!
        case 'userLoggedIn':
            return {
                ...action.payload
            }
        case 'userLoggedOut':
            return null
        case 'userChangedProfilePic':
            return {
                ...state,
                user: {
                    ...state.user,
                    images: action.payload,
                }
            }
        case 'userChangedAboutYou':
            return {
                ...state,
                user : {
                    ...state.user,
                    aboutYou: action.payload,
                }
            }
        case 'userChangedGender': {
            return {
                ...state,
                user : {
                    ...state.user,
                    gender: action.payload
                }
            }
        }
        default:
            return state;
    }
}
export default userReducer;