
// our New code using chakra ui
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import logo from '../assets/images/logo5.png';
import Profile from '../pages/ProfilePage';
import {
  Box,
  Flex,
  Spacer,
  Button,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const AppNavBar = () => {
  const [showloginModal, setShowloginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openloginModal = () => {
    setShowloginModal(true);
  };
  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeloginModal = () => {
    setShowloginModal(false);
  };
  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <ChakraProvider>
      <Box as="nav" bg="#eeeeee" py={4} px={4}> 
        <Flex align="center">
          <Box>
            <img src={logo} alt="Logo" width={180} height={180} />
          </Box>
          <Spacer />
          <Box>
            <Button
              bg="#00adb5"
              color="#ffffff"
              _hover={{ bg: "#00dee8" }}
              mr={2}
              shref={Profile}
            >
              Profile
            </Button>
            <Button
              bg="#00adb5"
              color="#ffffff"
              _hover={{ bg: "#00dee8" }}
              mr={2}
              onClick={openloginModal}
            >
              Login
            </Button>
            <Button
              bg="#00adb5"
              color="#ffffff"
              _hover={{ bg: "#00dee8" }}
              onClick={openSignUpModal}
            >
              Sign Up
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* Modal */}
      <Modal isOpen={showloginModal} onClose={closeloginModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add the login here  */}
            {/*  input fields and buttons */}
            <LoginForm />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={closeloginModal}>
              Close
            </Button>
            {/* Add a submit button or other actions here */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Sign Up Modal */}
      <Modal isOpen={showSignUpModal} onClose={closeSignUpModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add the SignUp  forms or content here */}
            {/* include input fields and buttons */}
            <SignUpForm />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={closeSignUpModal}>
              Close
            </Button>
            {/* Add a submit button or other actions here */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default AppNavBar;
