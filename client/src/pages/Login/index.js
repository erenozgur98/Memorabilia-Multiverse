import React, { useState, useEffect } from 'react';
import {
    Label,
    Input,
    Checkbox
} from '@rebass/forms';
import {
    Box,
    Button,
    Flex
} from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import './style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setUser, user }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (user.user_name) setRedirect(true)

    }, [user]);
    const submitHandler = async e => {
        e.preventDefault();
        try {
            const loggedInUser = await API.logIn(form);
            setUser(loggedInUser.data);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Flex className="container" alignItems='center'>
            {redirect && <Redirect to="/" />}
            <Box
                className="formCard"
                as='form'
                onSubmit={submitHandler}
                py={3}>
                <Flex mx={-2} mb={3}>
                    <Box width={1 / 2} px={3}>
                        <h1>Log In</h1>
                        <Label>
                            <div className="form">
                                <FontAwesomeIcon icon="user" />
                                {' '}
                                 Username
                             </div>
                        </Label>
                        <Input
                            className="text"
                            id='username'
                            name='username'
                            placeholder='username'
                            onChange={e => setForm({ ...form, username: e.target.value })}
                            value={form.username}
                        />
                    </Box>
                    <Box width={1 / 2} px={3}>
                        <Label>
                            <div className="form">
                                <FontAwesomeIcon icon="key" />
                                {' '}
                                 Password
                             </div>
                        </Label>
                        <Input
                            className="text"
                            id='password'
                            name='password'
                            type='password'
                            placeholder='password'
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            value={form.password}
                        />
                    </Box>
                    <Flex alignItems='center'>
                        <Box>
                            <Button className="btns" type="submit">Login</Button>
                            <Box>
                                <p className="lable-text">Don't have an account?</p>
                                <a className="redirect" href="/signup"> <p className="lable-text">Sign up here!</p></a>
                            </Box>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Login;