import React from 'react'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';

function Header() {
    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            variant='dark'
            sticky='top'
        >
            <NavbarBrand as={Link} className='navbar-brand' to='/'>
                <img src='' className='logo' alt='logo' />
            </NavbarBrand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className='ml-auto navbar'>
                    <Nav.Link as={Link} to='/home' className='nav-link'>
                        <div className="navLinks">
                            Home
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/login' className='nav-link'>
                        <div className="navLinks">
                            Login
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/signup' className='nav-link'>
                        <div className="navLinks">
                            Sign Up
                        </div>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
