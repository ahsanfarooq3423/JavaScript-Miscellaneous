const initialState = {
    counter : 0
}

const reducer = (state = initialState, action) => {
    if (action.type === "INCREMENT") {
        return {
            counter : state.counter +1
        }
    }

    if (action.type === 'CONSOLE') {
        console.log(state.counter);
    }
    return state;
}

export default reducer;