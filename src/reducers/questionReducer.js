import _ from 'lodash';
import {ADD_QUESTION, FETCH_QUESTIONS} from '../actions/types';

export default (state={}, action)=>{
    switch (action.type) {
        case FETCH_QUESTIONS:
            return {...state, ..._.mapKeys(action.payload,'id')};
        case ADD_QUESTION:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
} 