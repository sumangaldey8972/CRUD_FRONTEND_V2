import React from 'react'
import { Flex, Spacer, Box, Text, useToast } from '@chakra-ui/react'
import jwtDecode from 'jwt-decode'
import {useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { LOGOUT_USER_SUCCESSFULL } from '../store/Users/users.type'
const Navbar = () => {
    const token = useSelector((store)=>store.auth.token)
    const decode = jwtDecode(token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toast = useToast()
    const handleLogout = () => {
        dispatch({type: LOGOUT_USER_SUCCESSFULL})
        toast({
            title: 'Logout successfull',
            description: "",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        navigate('/login')
    }

    return (
        <Flex bg='green.400' color="white" fontSize='1.4rem' >
            <Box p='4'>
                User Management System
            </Box>
            <Spacer />
            <Link to="/userlist" >
            <Box p='4' >
                <Text colorScheme='teals' cursor="pointer" >View Users</Text>
            </Box>
            </Link>
            <Box p='4' >
                <Text colorScheme='teals' cursor="pointer" >Logged in as : {decode.role} </Text>
            </Box>
            <Box p='4' >
                <Text colorScheme='teals' cursor="pointer" onClick={handleLogout} >Logout</Text>
            </Box>
        </Flex>
    )
}

export default Navbar