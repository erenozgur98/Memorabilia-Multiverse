import React, { useRef } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';

function SignUp({ setUser, user }) {
    const email = useRef();
    const username = useRef();
    const password = useRef();

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.signup({ email: email.current.value, username: username.current.value, password: password.current.value });
            console.log(newUser);
        } catch (err) {
            console.log('SignUp error: ', err);
        }
    };

    return (
        <Container>
            <form action="/login" method="POST">
                <input type="text" name='email' placeholder='email' />
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
                <button onClick={signupHandler}>Login</button>
            </form>
        </Container>
    )
}

export default SignUp;
