import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Button } from 'reactstrap';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/actions/userActions';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><FontAwesomeIcon icon={faUtensils} /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/restaurants">Restaurants</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/meals">Meals</NavLink>
                        </NavItem>
                        {
                            userInfo ? (
                                <div>
                                    <NavItem>
                                        <NavLink href="/favorites">Favorites</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/mymeals">My meals</NavLink>
                                    </NavItem>
                                    <NavbarText >{userInfo.name}</NavbarText>
                                    <Button href="#signout" onClick={signoutHandler}>Log out</Button>
                                </div>
                            ) : (
                                <div>
                                    <Button href="/signin">Log in</Button>
                                </div>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;