import axios from '../axios';
import history from '../history';
import { SIGN_IN, SIGN_OUT, ADD_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION, DELETE_QUESTION, USERS_DETAIL, FETCH_USERS, TIME_VALID, TIME_INVALID} from './types'

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

export const timing_valid = ()=>{
    return {
        type: TIME_VALID
    }
};

export const timing_invalid = ()=>{
    return {
        type: TIME_INVALID
    }
};

export const addQuestion= (formValues)=> async (dispatch)=>{
    const response = await axios.post('/quiz', {...formValues} );
    console.log(response.data);
    dispatch({type: ADD_QUESTION, payload: response.data});
    window.location.replace('/admin/add');
    alert('A question has been added');
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
    alert('A question has been deleted');
}

export const usersDetail= (name, count) => async (dispatch) => {
    const response= await axios.post('/user',{user:name, points: count});
    dispatch({type: USERS_DETAIL, payload: response.data});
};

export const fetchUsers= () => async (dispatch) => {
    const response= await axios.get('/user');
    dispatch({type: FETCH_USERS, payload: response.data});
};
