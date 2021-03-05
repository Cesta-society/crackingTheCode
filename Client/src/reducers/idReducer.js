import { SELECTED_ID} from '../actions/types'

const INITIAL_STATE= {
    id: null,
    sno: null
}

export default (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case SELECTED_ID:
            return {...state, id: action.payload.id, sno: action.payload.sno};
        default:
            return state;
    }
}