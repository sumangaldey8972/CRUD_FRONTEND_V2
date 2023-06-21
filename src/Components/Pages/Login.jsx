import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
  Container,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login_action } from "../store/Users/user.action";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    user_name: "",
    user_password: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...creds,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (creds.user_name == "" || creds.user_password == "") {
      toast({
        title: "Please Filled al the fields",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (!creds.user_name.match(/^[a-zA-Z]+$/)) {
      toast({
        title: "User name must be a string",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(login_action(creds)).then((res) => {
        if (res.status) {
          toast({
            title: res.message,
            description: "",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/");
        } else {
          toast({
            title: res.message,
            description: "",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
    }
  };

  return (
    <VStack>
      <Heading color="teal">Login to Continue..</Heading>
      <Container
        maxW="sm"
        textAlign="center"
        p="6"
        border="1px solid teal"
        borderRadius=".9rem"
        m="4rem auto"
      >
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input
            type="text"
            name="user_name"
            value={creds.user_name}
            onChange={handleInputChange}
          />
          <FormHelperText>Enter User name</FormHelperText>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="user_password"
            value={creds.user_password}
            onChange={handleInputChange}
          />
          <FormHelperText>Enter Password</FormHelperText>
          <Button
            mt="4"
            type="submit"
            onClick={handleSubmit}
            colorScheme="teal"
          >
            {" "}
            {loading ? <Spinner /> : "Login"}{" "}
          </Button>
        </FormControl>
      </Container>
    </VStack>
  );
};

export default Login;
