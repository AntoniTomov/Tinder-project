const profileInfoReducer = (state, action) => {

    switch (action.type){
        // nice!!!
        case 'changedProfilePic':
            return {
                ...state,
                images: [action.payload.img, ...state.images]
            }
        default:
            return state;
    }
}
export default profileInfoReducer;