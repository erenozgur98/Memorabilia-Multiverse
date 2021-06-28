import React, { useRef } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';

function SignUp() {
    const email = useRef();
    const username = useRef();
    const password = useRef();

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.signUp({ email: email.current.value, username: username.current.value, password: password.current.value });
            console.log(newUser);
        } catch (err) {
            console.log('SignUp error: ', err);
        }
    };

    return (
        <Container>
            <h1>Memorabilia Multiverse</h1>
            <form action="/login" method="POST">
                <input type="text" name='email' placeholder='email' ref={email} />
                <input type="text" name="username" placeholder="username" ref={username} />
                <input type="password" name="password" placeholder="password" ref={password} />
                <button onClick={signupHandler}>Signup</button>
            </form>
        </Container>
    )
};

export default SignUp;
