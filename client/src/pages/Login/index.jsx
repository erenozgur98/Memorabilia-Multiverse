import React, { useEffect, useRef, useState } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router';

function Login({ setUser, user }) {
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const username = useRef();
    const password = useRef();

    useEffect(() => {
        if (user.username) setRedirect(true);
    }, [user])

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.logIn({ username: username.current.value, password: password.current.value });
            console.log(newUser);
            delete newUser.data.user.password;
            setUser(newUser);
            setRedirect(true);
            // history.push('/');
        } catch (err) {
            console.log('Login error: ', err);
        }
    };

    return (
        <Container>
            {redirect && <Redirect to='/' />}
            {/* <h1 className='d-flex justify-content-center'>Memorabilia Multiverse</h1> */}
            <form className="px-4 py-3">
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" placeholder="username" className='form-control' ref={username} />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" placeholder="password" className='form-control' ref={password} />
                </div>
                <button className='btn btn-primary btn-block' onClick={loginHandler}>Login</button>
            </form>
            <div className='d-flex justify-content-center'>
                <p>Don't have an account? Sign up <a href='/signup'>here</a>!</p>
            </div>
        </Container>
    )
};

export default Login;


