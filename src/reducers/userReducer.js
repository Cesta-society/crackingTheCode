import _ from 'lodash';
import {USERS_DETAIL} from '../actions/types';

export default (state={}, action)=>{
    switch (action.type) {
        case USERS_DETAIL:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
} 