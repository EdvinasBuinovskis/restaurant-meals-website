/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Label } from 'reactstrap';

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
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center py-4">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={submitHandler}>
                                <h4 className="text-center py-4">Prisijungimas</h4>
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
                                <MDBInput
                                    id="passwordField"
                                    label="Slaptažodis"
                                    placeholder="Įveskite slaptažodį"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="text-center py-4">
                                    <MDBBtn color="primary" type="submit">
                                        Prisijungti
                                    </MDBBtn>
                                </div>
                                <div className="text-center">
                                    <Label>Naujas naudotojas?</Label>
                                    <Link to="/register"> Registruotis</Link>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
