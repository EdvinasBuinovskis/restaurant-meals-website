import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

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
                        <NavItem>
                            <NavLink href="/favorites">Favorites</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/favorites">My meals</NavLink>
                        </NavItem>
                        {/* <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                            </DropdownItem>
                                <DropdownItem>
                                    Option 2
                            </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    <NavbarText>User Name</NavbarText>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button href="/login">Login</Button>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;