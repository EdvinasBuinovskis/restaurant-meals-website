/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Form, FormGroup, Input, Label } from 'reactstrap'
import { register } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function RegisterScreen(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const lowercasePassword = new RegExp('(?=.*[a-z])');
    const uppercasePassword = new RegExp('(?=.*[A-Z])');
    const digitPassword = new RegExp('(?=.*[0-9])');
    const specialPassword = new RegExp('(?=.*[^A-Za-z0-9])');
    const lengthPassword = new RegExp('(?=.{8,})');
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!emailRegex.test(email))
            return alert("Neteisingai įvedėte el. paštą");

        if (!lowercasePassword.test(password))
            return alert('Slaptažodyje turi būti bent viena mažoji raidė');
        if (!uppercasePassword.test(password))
            return alert('Slaptažodyje turi būti bent viena didžioji raidė');
        if (!digitPassword.test(password))
            return alert('Slaptažodyje turi būti bent vienas skaičius');
        if (!specialPassword.test(password))
            return alert('Slaptažodyje turi būti bent vienas specialus simbolis');
        if (!lengthPassword.test(password))
            return alert('Slaptažodis turi būti bent 8 simbolių ilgio');

        if (password !== confirmPassword)
            return alert('Slaptažodis ir patvirtinimo slaptažodis nesutampa');

        dispatch(register(username, email, password));

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
                        <MDBBtn color="primary" type="submit">Registruotis</MDBBtn>
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
