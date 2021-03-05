import { FULL_SCREEN} from '../actions/types'

const INITIAL_STATE= {
    isFullScreen: false 
}

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case FULL_SCREEN: 
            return {...state, isFullScreen: action.payload};
        default:
            return state;
    }
}