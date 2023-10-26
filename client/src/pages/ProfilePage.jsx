// "use client";
// import { FaGlobe, FaGithub, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
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
} from "@chakra-ui/react";

function ProfilePage() {
  return (
    <Grid // Meriam comment: use spanning columns https://chakra-ui.com/docs/components/grid
      h="900px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
      m={6}
    >
      <GridItem rowSpan={2} colSpan={2} p={4}>
        <Box
          maxW={"550px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          mb={4}
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
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                John Doe
              </Heading>
              <Text color={"gray.500"}>Full Stack Developer</Text>
              <Text color={"gray.500"}>Bay Area, San Francisco, CA</Text>
            </Stack>

            <Stack direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Following
                </Text>
              </Stack>
            </Stack>

            <Button
              w={"45%"}
              mt={8}
              mr={2}
              bg={useColorModeValue("#319795", "gray.900")} // for colors refer st https://chakra-ui.com/docs/styled-system/theme
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Follow
            </Button>
            <Button
              w={"45%"}
              mt={8}
              bg={useColorModeValue("#319795", "gray.900")} // original button color was #151f21
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              leftIcon={<EmailIcon />}
            >
              Email
            </Button>
          </Box>
        </Box>

        {/* social media box goes here */}
        <Card maxW="550px">
          <CardHeader>
            <Heading size="md">Contact me </Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box
                as="a"
                href="https://github.com/AllenHirmiz/Team-5-Task-Manager"
              >
                <Heading size="xs">
                  {/* you can add  also add textTransform="uppercase" or lowercase*/}
                  TaskPro Github
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<BsGithub />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Heading>
                <Text pt="2" fontSize="sm"></Text>
              </Box>
              <Box as="a" href="#">
                <Heading size="xs">
                  Twitter
                  <IconButton
                    aria-label="twitter"
                    variant="ghost"
                    size="lg"
                    icon={<BsTwitter size="28px" />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Heading>
                {/* <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text> */}
              </Box>
              <Box as="a" href="#">
                <Heading size="xs">
                  Linkedin
                  <IconButton
                    aria-label="linkedin"
                    variant="ghost"
                    size="lg"
                    icon={<BsLinkedin size="28px" />}
                    _hover={{
                      bg: "blue.500",
                      color: useColorModeValue("white", "gray.700"),
                    }}
                    isRound
                  />
                </Heading>
                {/* <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text> */}
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={4} p={4}>
        {/* large top card goes here */}
        <Card>
          <CardHeader>
            <Heading size="md">Personal Information</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  <p className="name">Full Name</p>
                </Heading>
                <Text pt="2" fontSize="sm">
                  John Doe {/* {userData.fullname}  will render the data here*/}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  <p className="job">Job Title</p>
                </Heading>
                <Text pt="2" fontSize="sm">
                  Full Stack Developer{" "}
                  {/* {userData.JobTitle}  will render the data here*/}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Company
                </Heading>
                <Text pt="2" fontSize="sm">
                  Google {/*  {userData.institution} */}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Address
                </Heading>
                <Text pt="2" fontSize="sm">
                  Bay Area, San Francisco, CA {/*  {userData.Address} */}
                </Text>
                <Button
                  w={"20%"}
                  mt={8}
                  bg={useColorModeValue("#319795", "gray.900")} // original button color was #151f21
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={2} p={1}>
        {/*  small bottom card goes here */}
        <Card>
          <CardHeader>
            <Heading size="md">Most Recent Projects</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={2} p={1}>
        {/* small bottom card goes here */}
        <Card>
          <CardHeader>
            <Heading size="md">Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default ProfilePage;
