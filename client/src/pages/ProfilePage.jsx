// "use client";
// import { FaGlobe, FaGithub, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Heading,
  Avatar,
  Box,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Image,
  Flex,
  Text,
  Stack,
  // HStack,
  // VStack,
  // Icon,
  // ButtonGroup,
  // InputGroup,
  IconButton,
  Grid,
  GridItem,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

function ProfilePage() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  console.log(user);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    jobTitle: "Full Stack Developer",
    company: "Google",
    address: "Bay Area, San Francisco, CA",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveProfileData = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveToLocalStorage = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    closeModal();
  };

  return (
    <Grid // Meriam comment: use spanning columns https://chakra-ui.com/docs/components/grid
      justifyContent={"center"}
      display={"flex"}
      w={"full"}
      width={"100vw"}
      height={"100vh"}
    >
      <GridItem p={4}>
        <Box
          maxW={"800px"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          mb={1}
          width={"100vw"}
        >
          <Image
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit="cover"
            alt="#"
          />

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {user.name}
              </Heading>
            </Stack>

            {/* <Button
              w={"100%"}
              mt={8}
              bg={useColorModeValue("#319795", "gray.900")} // original button color was #151f21
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              leftIcon={<EmailIcon />}
              as="a"
              onClick=""
              href={`mailto:${user.email}`}
            >
              Email
            </Button> */}
          </Box>
        </Box>

        {/* large top card goes here */}
        <Card maxW={"800px"}>
          <CardBody>
            <Heading size="md">Personal Information</Heading>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Full Name
                </Heading>
                <Text pt="2" fontSize="sm">
                  {user.name}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Job Title
                </Heading>
                <Text pt="2" fontSize="sm">
                  {profileData.jobTitle}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Company
                </Heading>
                <Text pt="2" fontSize="sm">
                  {profileData.company}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Address
                </Heading>
                <Text pt="2" fontSize="sm">
                  {profileData.address}
                </Text>
              </Box>
            </Stack>
          </CardBody>

          <CardHeader direction="row" spacing={2} align="center">
            <Button
              w={"40%"}
              mt={8}
              bg={useColorModeValue("#319795", "gray.900")} // original button color was #151f21
              color={"white"}
              rounded={"md"}
              onClick={openModal}
              // position="absolute"
              // right="0"
            >
              Edit Profile
            </Button>
            <Button
              w={"40%"}
              mt={8}
              ml={6}
              bg={useColorModeValue("#319795", "gray.900")} // original button color was #151f21
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              leftIcon={<EmailIcon />}
              as="a"
              onClick=""
              href={`mailto:${user.email}`}
            >
              Email
            </Button>
          </CardHeader>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile For: {user.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mt={4}>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    type="text"
                    name="jobTitle"
                    value={profileData.jobTitle}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Company</FormLabel>
                  <Input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={saveToLocalStorage}>
                  Save
                </Button>
                <Button variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default ProfilePage;
