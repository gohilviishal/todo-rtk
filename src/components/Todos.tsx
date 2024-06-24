import {
  Button,
  Container,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Text,
  useDisclosure,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import AddTodo from "./AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../features/todo/types";
import { RootState } from "../app/store";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { removeTodo } from "../features/todo/todoSlice";

const Todos: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
    toast({
      title: "TODO deleted.",
      description: "We've deleted todo for you.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Box bg="gray.100" minH="100vh" py={10}>
      <Container display="flex" justifyContent="center" mb={6}>
        <Button onClick={onOpen} colorScheme="teal">
          Add Todo
        </Button>
      </Container>
      <Container display="flex" justifyContent="center">
        <List spacing={4} width="100%">
          {todos.map((todo: Todo) => (
            <ListItem
              key={todo.id}
              display="flex"
              alignItems="center"
              bg="white"
              borderRadius="md"
              p={2}
              boxShadow="sm"
              _hover={{
                boxShadow: "md",
                transform: "scale(1.02)",
                transition: "0.2s",
              }}
              transition="0.2s"
            >
              <ListIcon as={CheckCircleIcon} color="teal.500" />
              <Text fontSize="lg" color="gray.800" flex="1">
                {todo.text}
              </Text>
              <Spacer />
              <IconButton
                icon={<CloseIcon />}
                aria-label="remove todo"
                color="black.600"
                cursor="pointer"
                mx={2}
                onClick={()=>handleDelete(todo.id)}
              />
            </ListItem>
          ))}
        </List>
      </Container>
      {isOpen && <AddTodo isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default Todos;
