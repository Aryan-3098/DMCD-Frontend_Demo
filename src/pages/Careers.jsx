import { Box, Button, FormControl, Image, Input, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import taxi from '../assets/images/taxi.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BACKEND_ENDPOINT } from '../constants'

const Careers = () => {

    let user = useSelector(state => state.user.user)
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone,
    });

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
                duration: 9000,
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

    return (
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
        </Box>
    );
}

export default Careers;
