import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    logIn: (userInfo) => {
        return axios.post('/api/users/login', userInfo);
    },

    logOut: () => {
        return axios.post('/api/users/logout');
    },

    signUp: (userInfo) => {
        return axios.post('/api/users/signup', userInfo);
    },

    loggedIn: () => {
        return axios.get('/api/user');
    },

    getAllUsers: () => {
        return axios.get('/api/users');
    },
}