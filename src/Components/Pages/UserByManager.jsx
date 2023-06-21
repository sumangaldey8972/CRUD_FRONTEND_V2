import React, { useEffect } from "react";
import Navbar from "./Navbar";
import {
  Card,
  CardBody,
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
  Box,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { get_user_by_manager } from "../store/Users/user.action";
import noData from "./../../assets/noData.gif";
import loadinggif from "./../../assets/loading.gif";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

const UserByManager = () => {
  const { loading, data, token } = useSelector((store) => store.auth);
  const decode = jwtDecode(token);
  const dispatch = useDispatch();
  const params = useParams();

  const get_user = () => {
    dispatch(get_user_by_manager(token, params.id));
  };

  useEffect(() => {
    get_user();
  }, []);

  return (
    <>
      <Navbar />

      <Text m=".4rem" w="fit-content" fontSize="2rem" color="green">
        {" "}
        <Link to="/userlist">
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
            <Card maxW="20%" key={user._id}>
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
              <CardFooter
                display={`${decode.role == "admin" ? "none" : "block"}`}
              >
                <ButtonGroup spacing="6" m="auto">
                  <Button variant="solid" disabled={true} colorScheme="blue">
                    <EditIcon />
                  </Button>
                  <Button variant="solid" colorScheme="red">
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      )}
    </>
  );
};

export default UserByManager;
