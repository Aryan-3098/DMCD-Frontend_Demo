import { Box, Button, FormControl, Image, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import taxi from '../assets/images/taxi.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BACKEND_ENDPOINT } from '../constants'
import {WarningTwoIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Careers = () => {
    let user = useSelector(state => state.user.user)
    const userLoggedIn=useSelector(state=>state.userLoggedIn)
    const [formData, setFormData] = useState({ name: '', phone: '' });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toast = useToast()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user.usertype==="ADMIN"){
            toast({
                title: 'ERROR',
                description:"You are trying to change an ADMIN to driver",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }
        const response = await axios.post(`${BACKEND_ENDPOINT}careerpost`, formData, { headers: { 'Content-Type': 'application/json' } });
        if (response.status === 201) {
            toast({
                title: 'We will contact you shortly',
                status: 'info',
                duration: 9000,
                isClosable: true,
            })
        }
    };
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                phone: user.phone,
            });
        }
    }, [user]);

    
    return (
        userLoggedIn?
        <Box className='overflow-y-scroll pt-20 h-full'>
            <Box className='flex justify-center'>
                <Image src={taxi} style={{height:"250px"}} />
            </Box>
            <Box style={{ width: "70%" }}>
                <Text style={{ left: "40%" }} className='text-center font-extrabold text-red-500 text-3xl relative bottom-12'>LOOKING FOR A<br /> DRIVER JOB</Text>
            </Box>
            <Text className='text-center font-bold text-xl'>Earn upto 30,000/month <br /> by driving cars</Text>
            {user.usertype === "DRIVER" ? (
                <Box className='flex justify-center items-center mt-10 text-2xl font-bold text-blue-500'>Already a Driver 🚕</Box>
            ) : (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} mx={5} mt={5} mb={2} pb={2}>
                        <FormControl id="name">
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter Name' />
                        </FormControl>
                        <FormControl id="phone">
                            <Input style={{backgroundColor:"gainsboro"}} type="tel" readOnly name="phone" value={user.phone} onChange={handleChange} />
                        </FormControl>
                        <Button type="submit">Submit</Button>
                    </VStack>
                </form>
            )}
        </Box>:
        <Box className='h-full pt-20 grid justify-center items-center grid-rows-2'>
        <Box className='row-span-1 h-full flex justify-center items-end'><WarningTwoIcon style={{color:"red",height:"25%",width:"25%"}} /></Box>
        <Box className='row-span-1 h-full flex justify-center items-start'> <Text className='text-2xl'>You need to <Link className='font-bold text-seconday underline' to="/signin-signup">SignIn</Link> first</Text></Box>

        </Box>
    );
}

export default Careers;
