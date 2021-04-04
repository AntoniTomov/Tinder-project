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
                images: action.payload,
            }
        case 'userChangedAboutYou':
            return {
                ...state,
                aboutYou: action.payload,
            }
        case 'userChangedGender': {
            return {
                ...state,
                gender: action.payload
            }
        }
        case 'userChangedLivingIn': {
            return {
                ...state,
                country: action.payload
            }
        }
        case 'userChangedPassions': {
            return {
                ...state,
                passions: action.payload
            }
        }
        case 'userChangedOrientation': {
            return {
                ...state,
                sexualOrientation: action.payload
            }
        }
        case 'userChangedJobTitle': {
            return {
                ...state,
                jobTitle: action.payload
            }
        }
        case 'userChangedCompany': {
            return {
                ...state,
                company: action.payload
            }
        }
        case 'userChangedCollegeOrUni': {
            return {
                ...state,
                collageOrUni: action.payload
            }
        }
        case 'userChangedliked': {
            return {
                ...state,
                liked: [...state.liked, action.payload]
            }
        }
        case 'userChangeddisliked': {
            return {
                ...state,
                disliked: [...state.disliked, action.payload]
            }
        }
        case 'userChangedmatches': {
            return {
                ...state,
                matches: [...state.matches, action.payload]
            }
        }
        default:
            return state;
    }
}
export default userReducer;