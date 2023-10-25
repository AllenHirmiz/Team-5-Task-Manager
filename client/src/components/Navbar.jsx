import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Profile from '../pages/ProfilePage';
import Auth from '../utils/auth';
import logo from '../assets/images/logo.png';
//import '../assets/JS/script'

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header id="navbar">
        <nav className="navbar-container container">
          <a href="/" className="home-link">
            <div className="navbar-logo"></div>
            Website Name
          </a>
          <button type="button" id="navbar-toggle" aria-controls="navbar-menu" aria-label="Toggle menu" aria-expanded="false">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div id="navbar-menu" aria-labelledby="navbar-toggle">
            <ul className="navbar-links">
              {Auth.loggedIn() ? (
                <>
                <li className="navbar-item"><a className="navbar-link" href="/Dashboard">Dashboard</a></li>
                <li className="navbar-item"><a className="navbar-link" href="/Profile">Profile</a></li>
                <li className="navbar-item"><a className="navbar-link" href="/ContactUs">Contact</a></li>
                <li className="navbar-item"><a className="navbar-link" onClick={Auth.logout}>Logout</a></li>
                </>
              ) : (
                <>
                <li className="navbar-item"><a className="navbar-link" href="/">Home Page</a></li>
                <li className="navbar-item"><a className="navbar-link" onClick={() => setShowModal(true)}>Login/Sign Up</a></li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {/* set modal data up */}
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
      </header>
    </>
  );
};

export default AppNavbar;
