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
            alert('Slaptažodis ir patvirtinimo slaptažodis nesutampa');
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
                        <Label>Registracija</Label>
                    </Col>
                </FormGroup>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormGroup row>
                    <Label for="usernameField" sm={1}>Naudotojo vardas</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="username" id="usernameField" placeholder="Įveskite naudotojo vardą" onChange={(e) => setUsername(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="emailField" sm={1}>El. paštas</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="text" name="email" id="emailField" placeholder="Įveskite el. paštą" onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="passwordField" sm={1}>Slaptažodis</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="password" name="password" id="passwordField" placeholder="Įveskite slaptažodį" onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="confirmPasswordField" sm={1}>Patvirtinti slaptažodį</Label>
                    <Col md={{ size: 4 }}>
                        <Input required type="password" name="password" id="confirmPasswordField" placeholder="Įveskite slaptažodį" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button type="submit">Registruotis</Button>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{ size: 4, offset: 1 }}>
                        <Label>Turite paskyrą?</Label>
                        <Link to="/signin"> Prisijungti</Link>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}
