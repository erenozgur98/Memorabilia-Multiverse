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
            <h1 className='d-flex justify-content-center'>Memorabilia Multiverse</h1>
            <form className="px-4 py-3">
                <div className="form-group">
                    {/* <label className="form-label">Username</label> */}
                    <input type="text" name="username" placeholder="username" className='form-control' ref={username} />
                </div>
                <div className="form-group">
                    {/* <label className="form-label">Password</label> */}
                    <input type="password" name="password" placeholder="password" className='form-control' ref={password} />
                </div>
                <button className='btn btn-primary btn-block' onClick={loginHandler}>Signup</button>
            </form>
        </Container>
    )
};

export default Login;


