import React, { useRef } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';

function Login({ setUser, user }) {
    const username = useRef();
    const password = useRef();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.logIn({ username: username.current.value, password: password.current.value });
            console.log(newUser);
        } catch (err) {
            console.log('SignUp error: ', err);
        }
    };

    return (
        <Container>
            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="username" ref={username} />
                <input type="password" name="password" placeholder="password" ref={password} />
                <button onClick={loginHandler}>Login</button>
            </form>
        </Container>
    )
}

export default Login;
