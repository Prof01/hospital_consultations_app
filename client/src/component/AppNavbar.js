import React, { useState, Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
  } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { useSelector } from 'react-redux';


function AppNavbar() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const [modal, toggle] = useState(false)

    const toggleModal = () => {
        toggle(!modal)
    }

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-5'>
                        <strong>{ user ? `Welcome ${user.fullName}` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <span className='ml-5'>
                        <Logout />
                   </span> 
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

    return (
        <div>
            <Navbar color='dark' dark expand='sm' className='mb-5'>
                <Container>
                    <NavbarBrand href="/">Patient Consultations</NavbarBrand>
                    <NavbarToggler onClick={toggleModal} />
                    <Collapse isOpen={modal} navbar>
                        <Nav className='ml-auto' navbar>
                            { isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}


export default AppNavbar;