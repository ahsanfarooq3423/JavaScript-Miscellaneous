import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter : 0
}

const reducer = (state = initialState, action) => {

    switch (action.type){
        case actionType.INCREMENT : 
            return updateObject(state, {counter : state.counter +1 });

        case actionType.DECREMENT :
            return updateObject(state, {counter : state.counter -1 });
            
        case actionType.ADD : 
            return updateObject(state, {counter : state.counter + action.val});
            
        case actionType.SUBTRACT : 
            return updateObject(state, {counter : state.counter - action.val});
            
    }


    return state;
}

export default reducer;