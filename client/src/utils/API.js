import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    logIn: (userInfo) => {
        return axios.post('/api/login', userInfo);
    },

    logOut: () => {
        return axios.post('/api/logout');
    },

    signUp: (userInfo) => {
        return axios.post('/api/signup', userInfo);
    },

    loggedIn: () => {
        return axios.get('/api/user');
    },

    getAllUsers: () => {
        return axios.get('/api/users');
    },
}