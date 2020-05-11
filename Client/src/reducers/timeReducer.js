import { TIME_VALID, TIME_INVALID} from '../actions/types'

const INITIAL_STATE= {
    valid: true
}

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case TIME_VALID: 
            return {...state, valid: true};
        case TIME_INVALID: 
            return {...state, valid: false};
        default:
            return state;
    }
}