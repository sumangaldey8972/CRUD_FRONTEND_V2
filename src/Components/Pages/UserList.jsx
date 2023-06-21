import React, { useEffect } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  CardFooter,
  Stack,
  Heading,
  useToast,
  Text,
  Image,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  ViewIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_user_action,
  get_user_action,
} from "../store/Users/user.action";
import noData from "./../../assets/noData.gif";
import loadinggif from "./../../assets/loading.gif";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
const UserList = () => {
  const { loading, data, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const decode = jwtDecode(token);
  const toast = useToast();

  const get_user = () => {
    dispatch(get_user_action(token));
  };

  useEffect(() => {
    get_user();
  }, []);

  const handleDelete = (id) => {
    dispatch(delete_user_action(token, id)).then((res) => {
      if (res.status) {
        toast({
          title: res.message,
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
  };

  return (
    <>
      <Navbar />

      <Text m=".4rem" w="fit-content" fontSize="2rem" color="green">
        {" "}
        <Link to="/">
          {" "}
          <ArrowBackIcon />{" "}
        </Link>{" "}
      </Text>

      {data.length == 0 && <Image src={noData} m="auto" />}
      {loading ? (
        <Image src={loadinggif} m="auto" />
      ) : (
        <Flex gap={4} mt="4">
          {data?.map((user) => (
            <Card
              maxW="20%"
              key={user._id}
              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            >
              <CardBody>
                <Box
                  m="auto"
                  boxSizing="border-box"
                  height="14rem"
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={user.image}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    m="auto"
                    maxWidth="100%"
                    maxHeight="100%"
                  />
                </Box>
                <Stack mt="6" spacing="1">
                  <Heading size="md">Name: {user.user_name}</Heading>
                  <Text>Email: {user.user_email}</Text>
                  <Text>Role: {user.user_role}</Text>
                  <Text>
                    Date of Birth:{" "}
                    {new Date(user.user_dob).toLocaleDateString()}
                  </Text>
                  <Text>Phone: {user.user_phone_number}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="6" m="auto">
                  <Link to={`/edit-user/${user._id}`}>
                    <Button variant="solid" colorScheme="blue">
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => handleDelete(user._id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Link to={`/user-add-by-manager/${user._id}`}>
                    <Button
                      variant="solid"
                      display={`${decode.role == "manager" ? "none" : "block"}`}
                      colorScheme="facebook"
                    >
                      <ViewIcon />
                    </Button>
                  </Link>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
};

export default UserList;
