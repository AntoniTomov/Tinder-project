const initialState = [];

const homePageReducer = (state = initialState, action) => {

    switch (action.type){
        case 'addToRemoved': {
            return [...state, action.payload]
        }
        case 'setRemoved': {
            return action.payload
        }
        default:
            return state;
    }
}
export default homePageReducer;