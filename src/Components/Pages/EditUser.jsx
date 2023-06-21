import React, { useEffect, useState } from "react";
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
  Grid,
  GridItem,
  Spinner,
  Image,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  edit_user_action,
  get_user_by_id_action,
} from "../store/Users/user.action";
import Navbar from "./Navbar";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState("");
  const { token, loading } = useSelector((store) => store.auth);
  const toast = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const decode = jwtDecode(token);
  const dispatch = useDispatch();
  const [img, setImage] = useState(null);

  const [creds, setCreds] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_dob: "",
    user_phone_number: "",
    user_role: `${decode.role == "admin" ? "manager" : "user"}`,
    id: "",
  });

  const get_user = () => {
    dispatch(get_user_by_id_action(params.id)).then((res) => {
      setShowImage(res.payload.image);
      setCreds(() => {
        return {
          user_name: res.payload.user_name,
          user_email: res.payload.user_email,
          user_password: res.payload.user_password,
          user_dob: res.payload.user_dob,
          user_phone_number: res.payload.user_phone_number,
          user_role: res.payload.user_role,
          id: res.payload._id,
        };
      });
    });
  };
  useEffect(() => {
    get_user();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...creds,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(() => e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      creds.user_name == "" ||
      creds.user_password == "" ||
      creds.user_email == "" ||
      creds.user_phone_number == "" ||
      creds.user_dob == "" ||
      creds.user_role == ""
    ) {
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
    } else if (
      !creds.user_email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    ) {
      toast({
        title: "invalid email",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const data = new FormData();
      data.append("data", JSON.stringify(creds));
      data.append("image", img);
      dispatch(edit_user_action(token, data, creds.id)).then((res) => {
        if (res.status) {
          toast({
            title: res.message,
            description: "",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/userlist");
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Navbar />
      <VStack>
        <Heading color="teal">Edit User</Heading>
        <Container
          maxW="lg"
          textAlign="center"
          p="6"
          border="1px solid teal"
          borderRadius=".9rem"
          m="4rem auto"
        >
          <FormControl>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  name="user_name"
                  value={creds.user_name}
                  onChange={handleInputChange}
                />
              </GridItem>
              <GridItem>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="user_email"
                  value={creds.user_email}
                  onChange={handleInputChange}
                />
              </GridItem>
              <GridItem>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="user_password"
                  value={creds.user_password}
                  onChange={handleInputChange}
                />
              </GridItem>
              <GridItem>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="Date"
                  name="user_dob"
                  value={formatDate(creds.user_dob)}
                  onChange={handleInputChange}
                />
              </GridItem>
              <GridItem>
                <FormLabel>Phone Nubmer</FormLabel>
                <Input
                  type="number"
                  name="user_phone_number"
                  value={creds.user_phone_number}
                  onChange={handleInputChange}
                />
              </GridItem>
              <GridItem>
                <FormLabel>Role</FormLabel>
                <Input
                  type="text"
                  name="user_role"
                  readOnly
                  value={creds.user_role}
                  onChange={handleInputChange}
                />
              </GridItem>
              <GridItem w="200%">
                <Flex
                  alignItems="center"
                  gap="7px"
                  w="40%"
                  m="auto"
                  justifyContent="space-between"
                  verticalAlign="middle"
                >
                  <Box>
                    <Image src={showImage} />
                  </Box>
                  <Box
                    bgColor="orange"
                    cursor="pointer"
                    borderRadius="5px"
                    p="1"
                    color="white"
                    onClick={() => setShow(!show)}
                  >
                    {" "}
                    <Text> {show ? "Cancel" : "Change"} </Text>{" "}
                  </Box>
                </Flex>
                {show && (
                  <>
                    <FormLabel>Select Image</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />{" "}
                  </>
                )}
              </GridItem>
            </Grid>
            <Button
              mt="4"
              type="submit"
              onClick={handleSubmit}
              colorScheme="teal"
            >
              {" "}
              {loading ? <Spinner /> : "Edit User"}{" "}
            </Button>
          </FormControl>
        </Container>
      </VStack>
    </>
  );
};

export default EditUser;
