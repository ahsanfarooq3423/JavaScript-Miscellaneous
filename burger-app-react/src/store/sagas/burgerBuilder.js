import {put} from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions/index';


export function* initIngredientsSaga() {
    const response = yield axios.get('https://react-my-burger-3670c.firebaseio.com/ingredients.json')
    
    try {
        yield put(actions.setIngredients(response.data))
    } catch (error) {
        yield put(actions.fetchedIngredientFailed());
    }
}