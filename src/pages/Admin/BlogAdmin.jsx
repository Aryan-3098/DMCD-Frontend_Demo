import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import BlogItem from '../../components/BlogItem';
import PostBlogModal from '../../components/modals/PostBLogModal';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/slick-custom.css"
import Carousel from '../../components/Carousel';
import { BACKEND_ENDPOINT } from '../../constants';
import BlogsLoadingSkeleton from '../../components/Loading/BlogsLoadingSkeleton';

const BlogAdmin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const userLoggedIn=useSelector(state=>state.userLoggedIn)
    const toast=useToast()
    useEffect(() => {
        fetchBlogs();
    },[]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_ENDPOINT}fetchlatestblogs`);
            setBlogs(response.data.blogs)
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddButtonClick = () => {
        if (userLoggedIn) {
            onOpen();
        } else {
            toast({
                title: 'SignIn',
                description: "You need to signin to use this.",
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
        }
    };

  
    return (
        <>
        {loading?<BlogsLoadingSkeleton/>:
                        <Box className="pt-20 h-full">
                        <Box className='flex justify-center mb-14'>
                            <Carousel blogs={blogs} />
                        </Box>
                        <Box className='font-bold text-xl ml-6 shadow-sm'>Recent Posts</Box>
                        <Box className='overflow-y-scroll mb-24' style={{ height: "calc(100% - 190px)" }}>
                            {blogs.map((blog) => (
                                <Link to={`/blog/${blog._id}`} key={blog._id}>
                                    <BlogItem blog={blog} />
                                </Link>
                            ))}
                            <Link to="/allblogs">See All Posts..</Link>
                        </Box>
        
                        <Box className='flex justify-center items-center fixed bottom-24 w-full'>
                        <Button onClick={handleAddButtonClick} className='bg-white'>Add <AddIcon pl={1} w={4} h={4} /></Button>
                        </Box>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader className='bg-accentsGY rounded-2xl'>Add a Blog</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody className='bg-accentsGY rounded-2xl' onClose={onClose}>
                                    <PostBlogModal />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
        }
        </>
    );
}

export default BlogAdmin;