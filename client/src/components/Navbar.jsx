import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Profile from '../pages/ProfilePage';
import Auth from '../utils/auth';
import logo from '../assets/images/logo.png';
//import navbar from '../assets/JS/Navbar.js'

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header id="navbar">
        <nav className="navbar-container container">
          <a href="/" className="home-link">
          <img src={logo} alt="Logo" className="logo" />
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
                <li className="navbar-item"><a className="navbar-link nav-link" href="/Dashboard">Dashboard</a></li>
                <li className="navbar-item"><a className="navbar-link nav-link" href="/Profile">Profile</a></li>
                <li className="navbar-item"><a className="navbar-link nav-link" href="/Contact">Contact Us</a></li>
                <li className="navbar-item"><a className="navbar-link nav-link" onClick={Auth.logout}>Logout</a></li>
                </>
              ) : (
                <>
                <li className="navbar-item"><a className="navbar-link nav-link" href="/">About TaskPro</a></li>
                <li className="navbar-item"><a className="navbar-link nav-link" href="/Contact">Contact Us</a></li>
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
