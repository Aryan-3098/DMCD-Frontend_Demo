import React, { useState } from 'react';
import { Box, Button, FormControl, FormHelperText, Image, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import logo from '../assets/images/DMCD-logos_transparent.png'
import { Link } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationType, setVerificationType] = useState('email');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSendOTP = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_ENDPOINT}send-otp`, { email, phone });
            if (response.status === 200) {
                toast({
                    title: 'OTP sent successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast({
                title: 'Error',
                description: 'Failed to send OTP. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_ENDPOINT}verify-otp`, { otp });
            if (response.status === 200) {
                // Handle successful OTP verification
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast({
                title: 'Error',
                description: 'Failed to verify OTP. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className='h-full flex justify-center items-center flex-col bg-primary'>
            <Box className='bg-white p-4 rounded-lg shadow-xl mt-10' height={500} width={350}>
                <Text className='text-center'>Forgot Password</Text>
                <FormControl>
                    <FormHelperText mb={2}>Choose verification method:</FormHelperText>
                    <Button onClick={() => setVerificationType('email')} colorScheme={verificationType === 'email' ? 'blue' : 'gray'} mr={2}>
                        Email
                    </Button>
                    <Button onClick={() => setVerificationType('phone')} colorScheme={verificationType === 'phone' ? 'blue' : 'gray'}>
                        Phone
                    </Button>
                </FormControl>

                {verificationType === 'email' ? (
                    <FormControl>
                        <FormHelperText mb={2}>Enter your email address:</FormHelperText>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                ) : (
                    <FormControl>
                        <FormHelperText mb={2}>Enter your phone number:</FormHelperText>
                        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </FormControl>
                )}

                <Button onClick={handleSendOTP} isLoading={loading} colorScheme="blue" mt={4}>
                    Send OTP
                </Button>

                <FormControl mt={4}>
                    <FormHelperText mb={2}>Enter the OTP sent to your {verificationType === 'email' ? 'email' : 'phone'}:</FormHelperText>
                    <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </FormControl>

                <Button onClick={handleVerifyOTP} isLoading={loading} colorScheme="green" mt={4}>
                    Verify OTP
                </Button>
            </Box>
            <Image src={logo} height={150} />
            <Box className='relative bottom-9 flex flex-col justify-center items-center' >
                <Link to="/terms-conditions">Terms & Conditions</Link>
            </Box>
        </Box>
    );
};

export default ForgotPassword;