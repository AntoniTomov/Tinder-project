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
};

const chosenProfileReducer = (state = initialState, action) => {

    switch (action.type){
        case 'setChosenProfile': {
            return action.payload
        }
        default:
            return state;
    }
}
export default chosenProfileReducer;