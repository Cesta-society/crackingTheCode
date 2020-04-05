import axios from '../axios';
import { SIGN_IN, SIGN_OUT, ADD_QUESTION, FETCH_QUESTIONS} from './types'

export const signIn = (userId)=>{
    return {
        type: SIGN_IN,
        payload: userId
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
};

export const fetchQuestions= () => async (dispatch) => {
    const response= await axios.get('/quiz');
    dispatch({type: FETCH_QUESTIONS, payload: response.data});
};