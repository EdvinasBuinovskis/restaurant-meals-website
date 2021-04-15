/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap'
import { signin } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LoginScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(username, password));
    };

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
                        <Input plaintext value="Log In" />
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
                    <Label for="passwordField" sm={1}>Password</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="password" name="password" id="passwordField" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button type="submit">Log in</Button>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Input plaintext value="New user?" />
                        <Link to="/register">Register</Link>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}
