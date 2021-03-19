import axios from '../axios';
import shuffle from 'shuffle-array';
import { SIGN_IN, SIGN_OUT, ADD_QUESTION, UPDATE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION, DELETE_QUESTION, USERS_DETAIL, FETCH_USERS, TIME_VALID, TIME_INVALID, SELECTED_ID, FULL_SCREEN} from './types'

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

export const timing_valid = (value)=>{
    return {
        type: TIME_VALID,
        payload: value
    }
};

export const timing_invalid = (value)=>{
    return {
        type: TIME_INVALID,
        payload: value
    }
};

export const selectId = (id,sno)=>{
    return {
        type: SELECTED_ID,
        payload: {
            id,
            sno
        }
    }
};

export const setFullScreen = (flag)=>{
    console.log(flag);
    return {
        type: FULL_SCREEN,
        payload: flag
    }
};

export const addQuestion= (formValues)=> async (dispatch)=>{
    const response = await axios.post('/crackingTheCode', {...formValues} );
    console.log(response.data);
    dispatch({type: ADD_QUESTION, payload: response.data});
    window.location.replace('/admin/add');
    alert('A question has been added');
};

export const fetchQuestions= () => async (dispatch) => {
    const response= await axios.get('/crackingTheCode');
    dispatch({type: FETCH_QUESTIONS, payload: shuffle.pick(response.data , {'picks': 15 })});
};

export const fetchQuestion= (id) => async (dispatch) => {
    const response = await axios.get(`/crackingTheCode/${id}`);
    dispatch({ type: FETCH_QUESTION, payload:response.data});
};

export const deleteQuestion= (id)=> async (dispatch)=> {
    console.log(id);
    await axios.delete(`/crackingTheCode/${id}`);
    dispatch({type: DELETE_QUESTION, payload: id});
    alert('A question has been deleted');
}

export const updateQuestion= (id, formValues)=> async (dispatch)=> {
    console.log("Edit="+formValues)
    const response=  await axios.put(`/crackingTheCode/${id}`, formValues);
    dispatch({ type: UPDATE_QUESTION, payload: response})
    window.location.replace('/');
    alert('A question has been updated');
};

export const usersDetail= (name, email, count, timeValue) => async (dispatch) => {
    console.log(timeValue);
    const response= await axios.post('/user',{user:name, email:email, points: count, time: timeValue});
    dispatch({type: USERS_DETAIL, payload: response.data});
};

export const fetchUsers= () => async (dispatch) => {
    const response= await axios.get('/user');
    console.log(response.data);
    dispatch({type: FETCH_USERS, payload: response.data});
};
