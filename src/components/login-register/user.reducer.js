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
        case 'userLoggedIn':
            return {
                ...action.payload,
            }
        case 'userLoggedOut':
            return initialState;
        case 'updateProfile': 
            return action.payload;
        case 'changeUserData' :
            return {
                ...action.payload
            }
        // case 'userAddedToLiked': {
        //     return {
        //         ...state,
        //         liked: [...state.liked, action.payload]
        //     }
        // }
        case 'userRemovedFromLiked': {
            return {
                ...state,
                liked: action.payload
            }
        }
        // case 'userAddedToDisliked': {
        //     return {
        //         ...state,
        //         disliked: [...state.disliked, action.payload]
        //     }
        // }
        // case 'userAddedToMatches': {
        //     return {
        //         ...state,
        //         matches: [...state.matches, action.payload]
        //     }
        // }
        case 'userRemovedFromMatches': {
            return {
                ...state,
                matches: action.payload,
            }
        }
        default:
            return state;
    }
}
export default userReducer;