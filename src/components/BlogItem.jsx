import React from 'react';
import { Box, Button, Image, InputRightElement, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../constants';

const BlogItem = ({ blog }) => {
    const highlights = JSON.parse(blog.highlights)
    const location = useLocation()
    const navigate = useNavigate()

    const deletePost = async (id, e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${BACKEND_ENDPOINT}deletepost`, { data: { blogid: id } });
            if (response.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    return (
        <Box id={blog._id} _hover={{ bgColor: "#450a0a", textColor: "white", transform: 'scale(1.01)' }} className='grid grid-cols-3 mx-4 my-10 bg-white pl-5 rounded-lg' overflow="hidden">
            <UnorderedList mt="2" className='col-span-2'>
                {highlights.map((highlight, index) => (
                    <ListItem key={index} className='font-bold'>{highlight}</ListItem>
                ))}
            </UnorderedList>
            <Box className='col-span-1 flex justify-end' >
                <Image className='relative left-7 z-0' src={blog.image.link} alt="Blog" style={{ maxWidth: '180px', maxHeight: "200px" }} />
                {location.pathname.includes('dashboard') && (
                    <Box className='mr-1 mt-1 p-3 z-10 rounded-full bg-red-600 border-red-600 flex justify-center items-center' h={5} w={5} onClick={(e) => deletePost(blog._id, e)}>
                        <DeleteIcon color={'white'} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default BlogItem;