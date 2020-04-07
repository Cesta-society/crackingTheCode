import axios from '../axios';
import history from '../history';
import { SIGN_IN, SIGN_OUT, ADD_QUESTION, FETCH_QUESTIONS, USERS_DETAIL} from './types'

export const signIn = (user)=>{
    return {
        type: SIGN_IN,
        payload: user
    }
};

export const signOut = ()=>{
    return {
        type: SIGN_OUT
    }
};

export const addQuestion= (formValues)=> async (dispatch)=>{
    const response = await axios.post('/quiz', {...formValues} );
    dispatch({type: ADD_QUESTION, payload: response.data});
    history.push('/');
};

export const fetchQuestions= () => async (dispatch) => {
    const response= await axios.get('/quiz');
    dispatch({type: FETCH_QUESTIONS, payload: response.data});
};

export const usersDetail= (name, count) => async (dispatch) => {
    console.log("axios="+count);
    const response= await axios.post('/user',{user:name, points: count});
    dispatch({type: USERS_DETAIL, payload: response.data});
};