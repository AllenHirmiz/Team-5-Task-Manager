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

const GET_TODOS = gql`
  query GetTodosQuery {
    todos {
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

// NAMED GraphQL mutation to add a task
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

function Dashboard() {
  const [newTask, setNewTask] = useState({
    username: "",
    title: "",
    description: "",
    dateCreated: new Date().toLocaleDateString(),
    dueDate: "",
    status: "Pending",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const { loading, error, data } = useQuery(GET_TODOS);
  // We need to check this if work.
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onError: (err) => {
      console.error("Error adding task:", err);
    },
  });
  console.log(data); // Check on the data

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSaveTask = async () => {
    try {
      await addTodo({
        variables: {
          ...newTask,
          datecreated: new Date().toISOString(),
        },
      });
      setIsOpen(false);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Render fetched tasks and handle loading and errors
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data.todos;

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditTaskIndex(index);
    setNewTask(tasks[index]);
    setIsOpen(true);
  };

  return (
    <Box p={4} bg="teal.50" borderRadius="md">
      {newTask.username && (
        <Text fontSize="2xl" fontWeight="bold" color="teal.800" mb={4}>
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
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={newTask.username}
                onChange={handleInputChange}
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
                name="dueDate"
                value={newTask.dueDate}
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
      >
        <Thead bg="teal.600">
          <Tr>
            <Th color="white">Username</Th>
            <Th color="white">Title</Th>
            <Th color="white">Description</Th>
            <Th color="white">Date Created</Th>
            <Th color="white">Due Date</Th>
            <Th color="white">Status</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task, index) => (
            <Tr key={index} _hover={{ bg: "teal.100" }}>
              <Td>{task.username}</Td>
              <Td>{task.title}</Td>
              <Td>{task.description}</Td>
              <Td>{task.dateCreated}</Td>
              <Td>{task.dueDate}</Td>
              <Td>{task.status}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  size="sm"
                  mr={2}
                  variant="outline"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Dashboard;

//////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Input,
//   FormControl,
//   FormLabel,
//   Textarea,
//   Select,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Text,
// } from "@chakra-ui/react";

// function Dashboard() {
//   // Load tasks from local storage or default to empty array
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   const [newTask, setNewTask] = useState({
//     username: "",
//     title: "",
//     description: "",
//     dateCreated: new Date().toLocaleDateString(),
//     dueDate: "",
//     status: "Pending",
//   });
//   const [isOpen, setIsOpen] = useState(false);
//   const [editTaskIndex, setEditTaskIndex] = useState(null);

//   // Save tasks to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   const handleSaveTask = () => {
//     if (editTaskIndex !== null) {
//       const updatedTasks = [...tasks];
//       updatedTasks[editTaskIndex] = newTask;
//       setTasks(updatedTasks);
//       setEditTaskIndex(null);
//     } else {
//       setTasks([...tasks, newTask]);
//     }
//     setNewTask({
//       username: "",
//       title: "",
//       description: "",
//       dateCreated: new Date().toLocaleDateString(),
//       dueDate: "",
//       status: "Pending",
//     });
//     setIsOpen(false);
//   };

//   const handleDelete = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   const handleEdit = (index) => {
//     setEditTaskIndex(index);
//     setNewTask(tasks[index]);
//     setIsOpen(true);
//   };

//   return (
//     <Box p={4} bg="teal.50" borderRadius="md">
//       {newTask.username && (
//         <Text fontSize="2xl" fontWeight="bold" color="teal.800" mb={4}>
//           Task Manager for {newTask.username}
//         </Text>
//       )}
//       <Button colorScheme="teal" mb={4} mt={2} onClick={() => setIsOpen(true)}>
//         Add Task
//       </Button>

//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader color="teal.600">
//             {editTaskIndex !== null ? "Edit Task" : "Add New Task"}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl mt={4}>
//               <FormLabel>Username</FormLabel>
//               <Input
//                 type="text"
//                 name="username"
//                 value={newTask.username}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Title</FormLabel>
//               <Input
//                 type="text"
//                 name="title"
//                 value={newTask.title}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Description</FormLabel>
//               <Textarea
//                 name="description"
//                 value={newTask.description}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Due Date</FormLabel>
//               <Input
//                 type="date"
//                 name="dueDate"
//                 value={newTask.dueDate}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Status</FormLabel>
//               <Select
//                 name="status"
//                 value={newTask.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Delayed">Delayed</option>
//               </Select>
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="teal" mr={3} onClick={handleSaveTask}>
//               {editTaskIndex !== null ? "Update" : "Save"}
//             </Button>
//             <Button
//               variant="outline"
//               colorScheme="teal"
//               onClick={() => setIsOpen(false)}
//             >
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <Table
//         variant="striped"
//         size="md"
//         borderWidth="1px"
//         borderColor="teal.200"
//         borderRadius="md"
//       >
//         <Thead bg="teal.600">
//           <Tr>
//             <Th color="white">Username</Th>
//             <Th color="white">Title</Th>
//             <Th color="white">Description</Th>
//             <Th color="white">Date Created</Th>
//             <Th color="white">Due Date</Th>
//             <Th color="white">Status</Th>
//             <Th color="white">Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {tasks.map((task, index) => (
//             <Tr key={index} _hover={{ bg: "teal.100" }}>
//               <Td>{task.username}</Td>
//               <Td>{task.title}</Td>
//               <Td>{task.description}</Td>
//               <Td>{task.dateCreated}</Td>
//               <Td>{task.dueDate}</Td>
//               <Td>{task.status}</Td>
//               <Td>
//                 <Button
//                   colorScheme="teal"
//                   size="sm"
//                   mr={2}
//                   variant="outline"
//                   onClick={() => handleEdit(index)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   colorScheme="red"
//                   size="sm"
//                   onClick={() => handleDelete(index)}
//                 >
//                   Delete
//                 </Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// }

// export default Dashboard;
