// using Chakra framework
import {                    
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)

  return (

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
  
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
  
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

// Comment out bootstrap version here 

// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// import { createUser } from '../utils/API';
// import Auth from '../utils/auth';

// const SignupForm = () => {
//   const navigate = useNavigate();
//   // set initial form state
//   const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', name: '' });
//   // set state for form validation
//   const [validated] = useState(false);
//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);
//   const [addUser, { error, data }] = useMutation(ADD_USER); 

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // check if form has everything (as per react-bootstrap docs)
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       const {data} = await addUser({
//         variables: {...userFormData}});
        
//       Auth.login(data.addUser.token);
//       navigate("/profile");
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }

//     setUserFormData({
//       username: '',
//       email: '',
//       password: '',
//       name: '',
//     });
//   };

//   return (
//     <>
//       {/* This is needed for the validation functionality above */}
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         {/* show alert if server response is bad */}
//         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
//           Something went wrong with your signup!
//         </Alert>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='name'>Name</Form.Label>
//           <Form.Control
//             type='name'
//             placeholder='Your name'
//             name='name'
//             onChange={handleInputChange}
//             value={userFormData.name}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='username'>Username</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Your username'
//             name='username'
//             onChange={handleInputChange}
//             value={userFormData.username}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='email'>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Your email address'
//             name='email'
//             onChange={handleInputChange}
//             value={userFormData.email}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
//         </Form.Group>



//         <Form.Group className='mb-3'>
//           <Form.Label htmlFor='password'>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Your password'
//             name='password'
//             onChange={handleInputChange}
//             value={userFormData.password}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={!(userFormData.username && userFormData.email && userFormData.password && userFormData.name)}
//           type='submit'
//           variant='success'>
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default SignupForm;