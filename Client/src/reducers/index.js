import { combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import userReducer from './userReducer';
import timeReducer from './timeReducer';
import idReducer from './idReducer';
import fullScreenReducer from './fullScreenReducer';


export default combineReducers({
    auth: authReducer,
    form: formReducer,
    questions: questionReducer,
    users: userReducer,
    time: timeReducer,
    selectedId: idReducer,
    fullScreen: fullScreenReducer
});