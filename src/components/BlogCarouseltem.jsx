import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Image } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BACKEND_ENDPOINT } from '../constants'

const BlogCarouselItem = ({ blog }) => {
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
        <>
            <Box className='flex justify-center items-center'>
                <Link to={`/blog/${blog._id}`}>
                    {location.pathname.includes('dashboard') && (
                        <Box className='flex justify-end relative top-7'>
                            <Box className='mr-1 mt-1 p-3 z-10 rounded-full bg-red-600 border-red-600 flex justify-center items-center' h={5} w={5} onClick={(e) => deletePost(blog._id, e)}>
                                <DeleteIcon color={'white'} />
                            </Box>
                        </Box>
                    )}
                    <Image src={blog.image.link} h={100} />
                </Link>
            </Box>
        </>
    )
}

export default BlogCarouselItem