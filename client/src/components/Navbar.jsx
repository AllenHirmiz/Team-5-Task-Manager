import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import logo from '../assets/images/logo.png';

function AppNavbar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Navbar id="navbar" expand="lg">
      <Container className="navbar-container container">
      <a href="/" className="home-link">
          <img src={logo} alt="Logo" className="logo" />
          </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="navbar-left">
          <Nav className="me-auto navbar-left">
            {Auth.loggedIn() ? (
                <>
                <Nav.Link className="navbar-link nav-link" href="/Dashboard">Dashboard</Nav.Link>
                <Nav.Link className="navbar-link nav-link" href="/Profile">Profile</Nav.Link>
                <Nav.Link className="navbar-link nav-link" href="/Contact">Contact</Nav.Link>
                <Nav.Link className="navbar-link nav-link" onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                <Nav.Link className="navbar-link nav-link" href="/">About TaskPro</Nav.Link>
                <Nav.Link className="navbar-link nav-link" href="/Contact">Contact Us</Nav.Link>
                <Nav.Link className="navbar-link nav-link" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </Navbar>
  );
}

export default AppNavbar;