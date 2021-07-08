import React, { useEffect, useRef, useState } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router';

function SignUp({ setUser, user }) {
    const [redirect, setRedirect] = useState(false);

    const email = useRef();
    const username = useRef();
    const password = useRef();

    useEffect(() => {
        if (user.username) {
            setRedirect(true);
        }
    }, [user]);


    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.signUp({ email: email.current.value, username: username.current.value, password: password.current.value });
            console.log(newUser);
            delete newUser.data.password;
            setUser(newUser);
            setRedirect(true);
            window.location.reload();
        } catch (err) {
            console.log('SignUp error: ', err);
        }
    };

    return (
        <Container>
            {redirect && <Redirect to='/' />}
            <h1 style={{ textAlign: 'center', borderBottom: '1px solid black' }}>Sign Up</h1>
            <form className="px-4 py-3">
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" ref={email} placeholder="email@example.com" />
                </div>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" placeholder="username" className='form-control' ref={username} />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" placeholder="password" className='form-control' ref={password} />
                </div>
                <button className='btn btn-primary btn-block' onClick={signupHandler}>Signup</button>
            </form>
        </Container>
    )
};

export default SignUp;

