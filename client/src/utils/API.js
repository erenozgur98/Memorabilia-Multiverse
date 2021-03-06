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
        return axios.get('/api/users/user');
    },

    getAllUsers: () => {
        return axios.get('/api/users');
    },

    getOneFranchise: (franchiseId) => {
        return axios.get('/api/products/fran/' + franchiseId)
    },

    getAll: () => {
        return axios.get('/api/products')
    },

    getFranchises: () => {
        return axios.get('/api/franchise');
    },

    getOneItem: (itemId) => {
        return axios.get('/api/products/' + itemId)
    },

    create: (body) => {
        return axios.post('/api/transactions', { product_id: body.id, franchise_id: body.franchise_id, user_id: body.user_id, price: parseFloat(body.fake_price), quantity: 1 });
    },
}