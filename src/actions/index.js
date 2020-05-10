import axios from '../axios';
import history from '../history';
import { SIGN_IN, SIGN_OUT, ADD_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION, DELETE_QUESTION, USERS_DETAIL, FETCH_USERS} from './types'

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

export const fetchQuestion= (id) => async (dispatch) => {
    const response = await axios.get(`/quiz/${id}`);
    dispatch({ type: FETCH_QUESTION, payload:response.data});
};

export const deleteQuestion= (id)=> async (dispatch)=> {
    console.log(id);
    await axios.delete(`/quiz/${id}`);
    dispatch({type: DELETE_QUESTION, payload: id});
    window.location.replace('/');
}

export const usersDetail= (name, count) => async (dispatch) => {
    const response= await axios.post('/user',{user:name, points: count});
    dispatch({type: USERS_DETAIL, payload: response.data});
};

export const fetchUsers= () => async (dispatch) => {
    const response= await axios.get('/user');
    dispatch({type: FETCH_USERS, payload: response.data});
};
