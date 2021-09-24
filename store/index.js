const initState = {
        data: {
            lat: 30.0444,
            lng: 31.2357
        },
        message: 'It is very hot in, Cairo',
        sentiment: 'Neutrual',
}

const reducer = (state = initState, action) => {
    if(action.type === 'UPDATE_PLACE') {
        return state.data = {
            data: action.payload.data,
            message: action.payload.message,
            sentiment: action.payload.sentiment
        };
    }
    return state;
}
export default reducer;