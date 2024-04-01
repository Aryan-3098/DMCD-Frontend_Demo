    import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
    import axios from 'axios'
    import React, { useState } from 'react'
    import { useSelector } from 'react-redux'
import { BACKEND_ENDPOINT } from '../../constants'

    const Customize = () => {
        const user = useSelector(state => state.user.user)
        const [image, setImage] = useState(null);
        const [text, setText] = useState('');
        const [title,setTitle]=useState('');
        const toast = useToast()

        const handleImageChange = (e) => {
            setImage(e.target.files[0]);
        };

        const handleTitleChange = (e) => {
            setTitle(e.target.value);
        };
        const handleTextChange = (e) => {
            setText(e.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('text', text);
                formData.append('title',title)
                const response = await axios.post(`${BACKEND_ENDPOINT}posthomedata`, formData,);
                if (response.status === 200) {
                    toast({
                        title: 'Success',
                        description: response.data.message,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: error,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        };
        return (
            <>
                {
                    user.usertype === "ADMIN" ? (
                        <Box className='flex justify-center items-center flex-col pt-20 h-full'>
                            <Box className=' bg-primary rounded-lg shadow-2xl'>
                                <Box className='flex jsutify-center items-center flex-col mt-4 p-3'>
                                    <Box className='font-bold text-2xl mt-5'>Home Page Customisation</Box>
                                    <Text className='mt-1 mb-5 italic'>Set your home page image and text</Text>
                                </Box>
                                <form onSubmit={handleSubmit} className=' p-5'>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor="image">Home Page Image:</FormLabel>
                                        <Input style={{ background: "white", padding: "5px" }} type="file" id="image" onChange={handleImageChange} />
                                    </FormControl>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor="text">Home Title:</FormLabel>
                                        <Input style={{ background: "white", padding: "5px" }} type="text" id="text" value={title} onChange={handleTitleChange} />
                                    </FormControl>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor="text">Home Text:</FormLabel>
                                        <Input style={{ background: "white", padding: "5px" }} type="text" id="text" value={text} onChange={handleTextChange} />
                                    </FormControl>
                                    <Button className='bg-white' _hover={{ bgColor: "#271801", textColor: "white" }} type="submit">
                                        Submit
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    ) : (
                        <Box>This Page is only accessible to admin</Box>
                    )
                }
            </>
        )
    }

    export default Customize                                                                                                                                                                                                                                                                                                                                                             