import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, redirect } from "react-router-dom";
import {
  Box,
  // Button,
  Container,
  Flex,
  Heading,
  Image,
  // Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify"; // https://www.npmjs.com/package/react-toastify React-Toastify allows you to add notifications to your app with ease
import UserImage from "../assets/images/user.png";

function ProfilePage() {
  const loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [userProjects, setProjectsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsDataLoading(true);
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      loggedIn.current = parsedResult.isLoggedIn;
      setLoggedInUser(parsedResult.user);
      setLoggedIn(loggedIn.current);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (loggedInUser && loggedInUser._id) {
        const userDataResult = await fetch(`/userData/${loggedInUser._id}`, {
          method: "GET",
        });
        const parsedUserDataResult = await userDataResult.json();
        setUserData(parsedUserDataResult);
        setIsDataLoading(false);
      }
    }
    fetchUserData();
  }, [loggedInUser]);

  useEffect(() => {
    async function fetchProjectData() {
      if (loggedInUser) {
        const dataResult = await fetch(
          `/projects/${loggedInUser._id}/profile`,
          {
            method: "GET",
          }
        );
        const parsedProjectsData = await dataResult.json();
        setProjectsData(parsedProjectsData);
      } else {
        toast.error("Please sign in!");
        setLoggedIn(false);
      }
    }
    fetchProjectData();
  }, [loggedInUser]);

  // const logoutPressed = () => {
  //   setLoggedIn(false);
  //   setLoggedInUser(null);
  //   props.logoutPressed();
  // };

  if (isLoggedIn) {
    return (
      <Flex className="profile-cont">
        <Box w="100%">
          <Container maxW="container.lg">
            <Heading as="h1" mt="3" fontSize="xl">
              Profile:
            </Heading>
            <Stack
              className="main-body"
              align="center"
              mt="4"
              spacing="5"
            >
              {isDataLoading && (
                // <Loader type="Puff" color="#005252" height={500} width={500} />
                <>
                  Loading...
                </>
              )}
              {!isDataLoading && (
                <Flex justify="center">
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing="5"
                  >
                    <Box>
                      <Image
                        src={UserImage}
                        alt="Admin"
                        rounded="full"
                        boxSize="120px"
                      />
                      <Text textAlign="center" mt="3" fontWeight="bold">
                        {userData.fullname}
                      </Text>
                      {/* <Link as={RouterLink} to="/profile/update">
                        <Button colorScheme="teal" mt="3">
                          Edit Profile
                        </Button>
                      </Link> */}
                    </Box>
                    <Box>

                      <Text fontSize="md" fontWeight="bold">
                        Full Name
                      </Text>

                      <Text color="teal.500">{userData.fullname}</Text>
                      <Text fontSize="md" fontWeight="bold">
                        Job
                      </Text>

                      <Text color="teal.500">{userData.job}</Text>
                      <Text fontSize="md" fontWeight="bold">
                        Institution
                      </Text>

                      <Text color="teal.500">{userData.institution}</Text>

                      <Text fontSize="md" fontWeight="bold">
                        Email
                      </Text>

                      <Text color="teal.500">{userData.username}</Text>

                      <Text fontSize="md" fontWeight="bold">
                        Location
                      </Text>

                      <Text color="teal.500">{userData.location}</Text>

                    </Box>
                  </Stack>
                </Flex>
              )}
              <Heading as="h3" mt="4" color="#005252" fontSize="lg">
                Most Recent Projects
              </Heading>
              <Stack
                direction="row"
                flexWrap="wrap"
                justify="center"
                mt="4"
                spacing="4"
              >
                {/* {!isDataLoading &&
                  userProjects.map((project) => (
                    <Link
                      key={project._id}
                      as={RouterLink}
                      to={"/projects/" + project._id}
                    >
                      <ProjectCard
                        key={project._id}
                        name={project.projectName}
                        description={project.projectDescription}
                      />
                    </Link>
                  ))} */}
              </Stack>
            </Stack>
          </Container>
        </Box>
        {/* <Footer /> */}
      </Flex>
    );
  } else {
    // return <Redirect to="/login" />;
    return redirect("/login")
  }
}

// Profile.propTypes = {
//   logoutPressed: PropTypes.func.isRequired,
// };

export default ProfilePage;
