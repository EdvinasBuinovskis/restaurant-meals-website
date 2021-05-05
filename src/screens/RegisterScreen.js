/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap'
import { register } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterScreen(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password do not match');
        } else {
            dispatch(register(username, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push('/');
        }
    }, [])

    useEffect(() => {
        if (userInfo && error) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div md={{ size: 4, offset: 1 }}>
            <Form onSubmit={submitHandler}>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Register</Label>
                    </Col>
                </FormGroup>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="usernameField" sm={1}>Username</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="username" id="usernameField" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="emailField" sm={1}>Email</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="email" id="emailField" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="passwordField" sm={1}>Password</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="password" name="password" id="passwordField" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="confirmPasswordField" sm={1}>Confirm Password</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="password" name="password" id="confirmPasswordField" placeholder="Enter your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button type="submit">Register</Button>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Have account?</Label>
                        <Link to="/signin"> Log in</Link>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}
