import React, { useRef } from 'react'
import API from '../../utils/API';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

function SignUp() {
    const history = useHistory();

    const email = useRef();
    const username = useRef();
    const password = useRef();

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await API.signUp({ email: email.current.value, username: username.current.value, password: password.current.value });
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
                    {/* <input type="text" name='email' placeholder='email' className='form-control' ref={email} /> */}
                    <input type="email" className="form-control" ref={email} placeholder="email@example.com" />
                </div>
                <div className="form-group">
                    <input type="text" name="username" placeholder="username" className='form-control' ref={username} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="password" className='form-control' ref={password} />
                </div>
                <button className='btn btn-primary btn-block' onClick={signupHandler}>Signup</button>
            </form>
        </Container>
    )
};

export default SignUp;

