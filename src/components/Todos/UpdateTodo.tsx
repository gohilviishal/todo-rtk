import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateTodo } from "../../features/todo/todoSlice";
import { Todo } from "../../features/todo/types";

interface UpdateTodoProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
}

const schema = yup.object().shape({
  text: yup.string().required("Title is required"),
});

type FormData = yup.InferType<typeof schema>;
export const UpdateTodo: React.FC<UpdateTodoProps> = ({
  isOpen,
  onClose,
  todo,
}) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: todo?.text ? todo.text : "",
    },
  });
  const onSubmitHandler = (data: FormData) => {
    dispatch(updateTodo({ id: todo?.id ? todo.id : "", text: data.text }));
    reset();
    onClose();
    toast({
      title: "TODO updated.",
      description: "We've updated your todo for you.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const dispatch = useDispatch();
  return (
    <Modal onClose={onClose} size="sm" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <InputGroup size="sm">
              <InputLeftAddon>Title</InputLeftAddon>
              <Input placeholder="todo" {...register("text")} />
            </InputGroup>
            {errors.text?.message && (
              <FormHelperText margin={1} color="red">
                {errors.text.message}
              </FormHelperText>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            marginX={2}
            color="green"
            onClick={handleSubmit(onSubmitHandler)}
          >
            SAVE
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
