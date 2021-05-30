/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { register } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Label } from 'reactstrap';

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
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center py-4">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={submitHandler}>
                                <h4 className="text-center py-4">Registracija</h4>
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                                <MDBInput className='mb-4'
                                    id="usernameField"
                                    label="Naudotojo vardas"
                                    placeholder="Įveskite naudotojo vardą"
                                    type="text"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <MDBInput className='mb-4'
                                    id="emailField"
                                    label="El. paštas"
                                    placeholder="Įveskite el. paštą"
                                    type="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput className='mb-4'
                                    id="passwordField"
                                    label="Slaptažodis"
                                    placeholder="Įveskite slaptažodį"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MDBInput
                                    id="confirmPasswordField"
                                    label="Patvirtinti slaptažodį"
                                    placeholder="Įveskite slaptažodį"
                                    type="password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="text-center py-4">
                                    <MDBBtn color="primary" type="submit">
                                        Registruotis
                                    </MDBBtn>
                                </div>
                                <div className="text-center">
                                    <Label>Turite paskyrą?</Label>
                                    <Link to="/signin"> Prisijungti</Link>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
