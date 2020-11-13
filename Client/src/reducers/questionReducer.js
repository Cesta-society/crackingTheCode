import _ from 'lodash';
import {UPDATE_QUESTION, ADD_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION} from '../actions/types';

export default (state={}, action)=>{
    switch (action.type) {
        case FETCH_QUESTIONS:
            return {...state, ..._.mapKeys(action.payload,'id')};
        case FETCH_QUESTION:
            return { ...state, [action.payload.id]: action.payload };
        case ADD_QUESTION:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_QUESTION:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_QUESTION:
            return _.omit(state, action.payload);
        default:
            return state;
    }
} 