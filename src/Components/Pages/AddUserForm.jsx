import React, { useState } from 'react'
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
    Spinner
} from '@chakra-ui/react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from "react-redux"
import jwtDecode from 'jwt-decode'
import { add_user_action } from '../store/Users/user.action'
import {useNavigate} from "react-router-dom"

const Add_user_form = () => {
    const { token, loading } = useSelector((store) => store.auth)
    const decode = jwtDecode(token)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [img, setImage] = useState(null)
    const [creds, setCreds] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
        user_dob: "",
        user_phone_number: "",
        user_role: `${decode.role == 'admin' ? 'manager' : 'user'}`,
        image: img,
    })
    const toast = useToast()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreds({
            ...creds,
            [name]: value
        })
    }

    const handleImageChange = (e) => {
        setImage(() => e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (creds.user_name == "" || creds.user_password == "" || creds.user_email == "" || creds.user_phone_number == "" || creds.user_dob == "" || creds.user_role == "") {
            toast({
                title: 'Please Filled al the fields',
                description: "",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            const data = new FormData();
            data.append('data', JSON.stringify(creds))
            data.append('image', img)
           
            dispatch(add_user_action(data, token)).then((res) => {
                
                if(res.status){
                    toast({
                        title: res.message,
                        description: "",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigate('/userlist')
                } else {
                    toast({
                        title: res.message,
                        description: "",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            
        }

    }


    return (
        <>
            <Navbar />
            <VStack>
                <Heading color='teal' >Add User Form</Heading>
                <Container maxW='lg' textAlign="center" p="6" border="1px solid teal" borderRadius=".9rem" m="4rem auto" >
                    <FormControl >
                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            <GridItem>
                                <FormLabel>User Name</FormLabel>
                                <Input type='text' pattern='^[A-Za-z]+$' name="user_name" value={creds.user_name} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Email</FormLabel>
                                <Input type='text' name="user_email" value={creds.user_email} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Password</FormLabel>
                                <Input type='password'  name="user_password" value={creds.user_password} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <Input type='Date' name="user_dob" value={creds.user_dob} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Phone Nubmer</FormLabel>
                                <Input type='number' name="user_phone_number" value={creds.user_phone_number} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem>
                                <FormLabel>Role</FormLabel>
                                <Input type='text' name="user_role" readOnly value={creds.user_role} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem w='200%'>
                                <FormLabel>Select Image</FormLabel>
                                <Input type='file' accept='image/*' name="image" onChange={handleImageChange} />
                            </GridItem>
                        </Grid>
                        <Button mt="4" type="submit" onClick={handleSubmit} colorScheme='teal' > {loading ? <Spinner /> : 'Add User'} </Button>
                    </FormControl>
                </Container>
            </VStack>
        </>
    )
}

export default Add_user_form