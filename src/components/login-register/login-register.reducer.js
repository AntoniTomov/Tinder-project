const initialState = {
    uid: '',
    name: '',
    email: '',
    aboutYou: '',
    age: null,
    collageOrUni: '',
    company: '',
    country: '',
    city: '',
    gender: '',
    jobTitle: '',
    images: [],
    mediaProfiles: [],
    sexualOrientation: '',
    youtubeSong: '',
    passions: [],
    chats: [],
    isOnline: false,
    liked: [],
    disliked: [],
    matches: []
}

const userReducer = (state = initialState, action) => {

    switch (action.type){
        // nice!!!
        case 'userLoggedIn':
            return {
                ...action.payload,
            }
        case 'userLoggedOut':
            return initialState;
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
                company: action.payload
            }
        }
        default:
            return state;
    }
}
export default userReducer;