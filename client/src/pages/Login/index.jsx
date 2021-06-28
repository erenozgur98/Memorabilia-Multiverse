import React, { useRef } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

function Login() {
    const history = useHistory();

    const username = useRef();
    const password = useRef();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.logIn({ username: username.current.value, password: password.current.value });
            console.log(newUser);
            history.push('/');
        } catch (err) {
            console.log('SignUp error: ', err);
        }
    };

    return (
        <Container>
            <h1>Memorabilia Multiverse</h1>
            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="username" className='form-control' ref={username} />
                <input type="password" name="password" placeholder="password" className='form-control' ref={password} />
                <button className='btn btn-success' onClick={loginHandler}>Login</button>
            </form>
        </Container>
    )
};

export default Login;
