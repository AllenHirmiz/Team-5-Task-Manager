import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, redirect } from "react-router-dom";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  Heading,
  Textarea,
  Flex,
  InputGroup,
  InputLeftAddon,
  Editable,
  EditableInput,
  EditablePreview,
  Checkbox,
  // DatePicker,
  Select,
} from "@chakra-ui/react";

import { toast } from "react-toastify"; // https://www.npmjs.com/package/react-toastify React-Toastify allows you to add notifications to your app with ease
import UserImage from "../assets/images/user.png";

function Dashboard() {
  const loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [userProjects, setProjectsData] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  // Create an array of predefined due dates
  const dueDateOptions = [
    "No due date",
    "Today",
    "Tomorrow",
    "This week",
    "Next week",
    "Custom",
  ];

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      title: titleInput || "Untitled",
      description: descriptionInput || "No description",
      dueDate: dueDateInput || "No due date",
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
    setTitleInput("");
    setDescriptionInput("");
    setDueDateInput("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = (index) => {
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

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
              Dashboard:
            </Heading>
            <Stack className="main-body" align="center" mt="4" spacing="5">
              {isDataLoading && (
                // <Loader type="Puff" color="#005252" height={500} width={500} />
                <>DASHBOARD........</>
              )}
              {!isDataLoading && (
                <Flex justify="center">
                  <Stack direction={{ base: "column", md: "row" }} spacing="5">
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
              {/* <Heading as="h3" mt="4" color="#005252" fontSize="lg">
                Most Recent Projects
              </Heading> */}

              <ChakraProvider>
                <VStack spacing={4} align="stretch" p={4}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Task Manager
                  </Text>
                  <Stack direction="row" spacing={4}>
                    <Input
                      type="text"
                      placeholder="Title"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Description"
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                    <Select
                      placeholder="Due Date"
                      value={dueDateInput}
                      onChange={(e) => setDueDateInput(e.target.value)}
                    >
                      {dueDateOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="text"
                      placeholder="Priority"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                    />
                    <Button colorScheme="blue" onClick={handleAddTask}>
                      Add
                    </Button>
                  </Stack>
                  <Box>
                    {tasks.map((task, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bg={task.completed ? "green.100" : "gray.100"}
                        p={2}
                        borderRadius="md"
                      >
                        {editIndex === index ? (
                          // Editing mode
                          <VStack spacing={1} align="start">
                            <Editable
                              defaultValue={task.title}
                              onSubmit={(value) =>
                                handleEditTask(index, "title", value)
                              }
                            >
                              <EditablePreview />
                              <EditableInput />
                            </Editable>
                            <Textarea
                              value={task.description}
                              onChange={(e) =>
                                handleEditTask(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                            <Select
                              placeholder="Due Date"
                              value={task.dueDate}
                              onChange={(e) =>
                                handleEditTask(index, "dueDate", e.target.value)
                              }
                            >
                              {dueDateOptions.map((option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Select>
                          </VStack>
                        ) : (
                          // Display mode
                          <VStack spacing={1} align="start">
                            <Text>{task.title}</Text>
                            <Text>{task.description}</Text>
                            <InputGroup size="sm">
                              <InputLeftAddon>Due Date:</InputLeftAddon>
                              <Text>{task.dueDate}</Text>
                            </InputGroup>
                          </VStack>
                        )}
                        <Stack direction="row">
                          {editIndex === index ? (
                            <Button
                              colorScheme="blue"
                              size="sm"
                              onClick={() => handleSaveEdit(index)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              colorScheme="gray"
                              size="sm"
                              onClick={() => handleEditTask(index)}
                            >
                              Edit
                            </Button>
                          )}
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleDeleteTask(index)}
                          >
                            Delete
                          </Button>
                          <Checkbox
                            isChecked={task.completed}
                            onChange={() => handleToggleCompletion(index)}
                          >
                            Completed
                          </Checkbox>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                </VStack>
              </ChakraProvider>

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
    return redirect("/login");
  }
}

// Profile.propTypes = {
//   logoutPressed: PropTypes.func.isRequired,
// };

export default Dashboard;
