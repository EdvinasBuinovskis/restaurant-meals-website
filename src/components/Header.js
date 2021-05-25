/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/actions/userActions';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBContainer,
    MDBIcon,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { Collapse, NavbarToggler } from 'reactstrap';

export default function App() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }

    const pathname = window.location.pathname;

    return (
        <header>
            <MDBNavbar expand='lg' light bgColor='white'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href="/">
                        <MDBIcon className='ms-1' icon='utensils' size='lg' />
                    </MDBNavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>

                        <MDBNavbarNav right className='mb-2 mb-lg-0'>
                            <MDBNavbarItem active={pathname == '/' || pathname == '/restaurants'}>
                                <MDBNavbarLink aria-current='page' href='/restaurants'>
                                    Restoranai
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem active={pathname == '/meals'}>
                                <MDBNavbarLink href='/meals'>Patiekalai</MDBNavbarLink>
                            </MDBNavbarItem>
                            {
                                userInfo ? (
                                    <>
                                        <MDBNavbarItem active={pathname == '/favorites'}>
                                            <MDBNavbarLink href="/favorites">Įsiminti</MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem active={pathname == '/mymeals'}>
                                            <MDBNavbarLink href="/mymeals">Mano patiekalai</MDBNavbarLink>
                                        </MDBNavbarItem>

                                        <span className='navbar-text ml-auto p-2' >{userInfo.username}</span>

                                        <MDBNavbarLink aria-current='page' href='#signout' onClick={signoutHandler}>
                                            <MDBIcon className='ms-1' icon='sign-out-alt' size='lg' />
                                        </MDBNavbarLink>
                                    </>
                                ) : (
                                    <>
                                        <MDBNavbarLink className="ml-auto p-2" aria-current='page' href='/signin'>
                                            <MDBIcon className='ms-1' icon='sign-in-alt' size='lg' />
                                        </MDBNavbarLink>
                                    </>
                                )
                            }
                        </MDBNavbarNav>
                    </Collapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    );
}

