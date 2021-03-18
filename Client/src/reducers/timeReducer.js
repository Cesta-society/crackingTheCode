import { TIME_VALID, TIME_INVALID} from '../actions/types'

const INITIAL_STATE= {
    valid: true,
    value: 1500
}

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case TIME_VALID: 
            return {...state, valid: true, value:action.payload};
        case TIME_INVALID: 
            return {...state, valid: false,  value:action.payload};
        default:
            return state;
    }
}