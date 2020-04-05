import { SIGN_IN, SIGN_OUT} from '../actions/types'

const INITIAL_STATE= {
    isSignedIn: null,
    user: null
}

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN: 
            return {...state, isSignedIn: true, username: action.payload.name,userId: action.payload.Id};
        case SIGN_OUT:
            return {...state, isSignedIn: false, user: null};
        default:
            return state;
    }
}