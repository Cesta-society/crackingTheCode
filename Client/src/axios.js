import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz123.herokuapp.com/proxy',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
});