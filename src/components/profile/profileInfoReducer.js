const profileInfoReducer = (state, action) => {

    switch (action.type){
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