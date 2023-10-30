// Import necessary libraries and components
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { gql } from "@apollo/client";

// GraphQL queries for fetching todos
const GET_TODOS = gql`
  query GetTodosQuery {
    todo {
      _id
      username
      title
      description
      datecreated
      duedate
      status
    }
  }
`;

// GraphQL mutations for adding, editing, and removing todos
const ADD_TODO = gql`
  mutation AddTodoMutation(
    $username: String!
    $title: String!
    $description: String!
    $datecreated: String!
    $duedate: String!
    $status: String!
  ) {
    addTodo(
      username: $username
      title: $title
      description: $description
      datecreated: $datecreated
      duedate: $duedate
      status: $status
    ) {
      _id
      username
      title
      description
      datecreated
      duedate
      status
    }
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($todoId: ID!) {
    removeTodo(todoId: $todoId) {
      _id
    }
  }
`;

const EDIT_TODO = gql`
  mutation EditTodoMutation(
    $id: ID!
    $username: String!
    $title: String!
    $description: String!
    $datecreated: String!
    $duedate: String!
    $status: String!
  ) {
    editTodo(
      _id: $id
      username: $username
      title: $title
      description: $description
      datecreated: $datecreated
      duedate: $duedate
      status: $status
    ) {
      _id
      username
      title
      description
      datecreated
      duedate
      status
    }
  }
`;

function Dashboard() {
  // Initialize state variables
  const [newTask, setNewTask] = useState({
    username: "",
    title: "",
    description: "",
    datecreated: new Date().toISOString().slice(0, 10),
    duedate: "",
    status: "Pending",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  // Fetch todos and setup mutations using Apollo client
  const { loading, error, data } = useQuery(GET_TODOS);

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onError: (err) => {
      console.error("Error adding task:", err);
    },
  });

  const [editTodo] = useMutation(EDIT_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onError: (err) => {
      console.error("Error editing task:", err);
    },
  });

  const [removeTodo] = useMutation(REMOVE_TODO);

  // Handler to delete a todo
  const handleDelete = async (index) => {
    const todoId = data.todo[index]._id;
    try {
      await removeTodo({
        variables: { todoId },
        update: (cache) => {
          const existingTodos = cache.readQuery({ query: GET_TODOS });
          const newTodos = existingTodos.todo.filter(
            (todo) => todo._id !== todoId
          );
          cache.writeQuery({ query: GET_TODOS, data: { todo: newTodos } });
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Handler to capture input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handler to save or update a task
  const handleSaveTask = async () => {
    if (editTaskIndex !== null) {
      const taskToUpdate = {
        ...newTask,
        datecreated:
          newTask.datecreated || new Date().toISOString().slice(0, 10),
        duedate: newTask.duedate || new Date().toISOString().slice(0, 10),
      };
      try {
        await editTodo({
          variables: {
            id: taskToUpdate._id,
            ...taskToUpdate,
          },
        });
        handleCloseModal();
      } catch (err) {
        console.error("Error editing task:", err);
      }
    } else {
      try {
        await addTodo({
          variables: {
            ...newTask,
            datecreated: new Date().toISOString().slice(0, 10),
          },
        });
        handleCloseModal();
      } catch (err) {
        console.error("Error saving task:", err);
      }
    }
  };

  // Handler to open the edit modal
  const handleEditOpen = (index) => {
    const taskToEdit = data.todo[index];
    setNewTask(taskToEdit);
    setIsOpen(true);
    setEditTaskIndex(index);
  };

  // Handler to close the modal and reset the state
  const handleCloseModal = () => {
    setIsOpen(false);
    setEditTaskIndex(null);
    setNewTask({
      username: "",
      title: "",
      description: "",
      datecreated: new Date().toLocaleDateString(),
      duedate: "",
      status: "Pending",
    });
  };

  // Utility function to format date
  const formatDate = (timestampOrDateString) => {
    if (!timestampOrDateString) return "Not set"; // Handle null or undefined values

    // Check if it's a number or a string that looks like a large timestamp (13 digits)
    if (
      typeof timestampOrDateString === "string" &&
      /^\d{13}$/.test(timestampOrDateString)
    ) {
      timestampOrDateString = Number(timestampOrDateString);
    }

    const date = new Date(timestampOrDateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date or timestamp:", timestampOrDateString);
      return "Invalid Date";
    }

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Render the main component
  return (
    <Box
      p={{ base: 4, md: 10 }}
      bg="teal.50"
      borderRadius="md"
      width={"100vw"}
      height={"100vh"}
    >
      {newTask.username && (
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="teal.800"
          mb={4}
        >
          Task Manager for {newTask.username}
        </Text>
      )}
      <Button colorScheme="teal" mb={4} mt={2} onClick={() => setIsOpen(true)}>
        Add Task
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="teal.600">
            {editTaskIndex !== null ? "Edit Task" : "Add New Task"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel></FormLabel>
              <Input
                type="text"
                name="username"
                value={newTask.username}
                onChange={handleInputChange}
                readOnly
                border={"none"}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                name="duedate"
                value={newTask.duedate}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveTask}>
              {editTaskIndex !== null ? "Update" : "Save"}
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Table
        variant="striped"
        size="md"
        borderWidth="1px"
        borderColor="teal.200"
        borderRadius="md"
        display={{ base: "block", md: "table" }}
      >
        <Thead
          bg="teal.600"
          display={{ base: "none", md: "table-header-group" }}
        >
          <Tr>
            {/* <Th color="white">Username</Th> */}
            <Th color="white">Title</Th>
            <Th color="white">Description</Th>
            <Th color="white">Date Created</Th>
            <Th color="white">Due Date</Th>
            <Th color="white">Status</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.todo.map((task, index) => (
            <Tr key={index} _hover={{ bg: "teal.100" }}>
              {/* <Td display={{ base: "flex", md: "table-cell" }}>
                <Text display={{ base: "block", md: "none" }} fontWeight="bold">
                  Username:{" "}
                </Text>
                {task.username}
              </Td> */}

              <Td display={{ base: "flex", md: "table-cell" }}>
                <Text display={{ base: "block", md: "none" }} fontWeight="bold">
                  Title:{" "}
                </Text>
                {task.title}
              </Td>

              <Td display={{ base: "flex", md: "table-cell" }}>
                <Text display={{ base: "block", md: "none" }} fontWeight="bold">
                  Description:{" "}
                </Text>
                {task.description}
              </Td>

              <Td display={{ base: "flex", md: "table-cell" }}>
                <Text display={{ base: "block", md: "none" }} fontWeight="bold">
                  Date Created:{" "}
                </Text>
                {formatDate(task.datecreated)}
              </Td>

              <Td display={{ base: "flex", md: "table-cell" }}>
                <Text display={{ base: "block", md: "none" }} fontWeight="bold">
                  Due Date:{" "}
                </Text>
                {task.duedate ? formatDate(task.duedate) : "Not set"}
              </Td>

              <Td display={{ base: "flex", md: "table-cell" }}>
                <Text display={{ base: "block", md: "none" }} fontWeight="bold">
                  Status:{" "}
                </Text>
                {task.status}
              </Td>
              <Td>
                <Box display={{ base: "block", md: "flex" }} width="full">
                  <Button
                    colorScheme="teal"
                    size="sm"
                    mb={{ base: 2, md: 0 }}
                    mr={{ base: 0, md: 2 }}
                    width={{ base: "full", md: "auto" }}
                    variant="outline"
                    onClick={() => handleEditOpen(index)}
                  >
                    Edit
                  </Button>

                  <Button
                    colorScheme="red"
                    size="sm"
                    width={{ base: "full", md: "auto" }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Dashboard;
