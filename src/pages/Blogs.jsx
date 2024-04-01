import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import BlogItem from '../components/BlogItem.jsx';
import PostBlogModal from '../components/modals/PostBLogModal.jsx';
import { Link } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants.js';

const Blogs = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [totalBlogsCount, setTotalBlogsCount] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetchBlogs(offset); 
    }, [offset]); 

    useEffect(() => {
        if (scrollRef.current && totalBlogsCount > blogs.length) {
            scrollRef.current.addEventListener('scroll', handleScroll);
            return () => {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            };
        }
    }, [scrollRef, totalBlogsCount, blogs]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight && !loading) {
            const newOffset = offset + 5; 
            setOffset(newOffset); 
        }
    };

    const fetchBlogs = async (newOffset) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_ENDPOINT}fetchallblogs?offset=${newOffset}`);
            const fetchedBlogs = response.data.blogs.filter(blog => !blogs.some(prevBlog => prevBlog._id === blog._id));
            if (newOffset === 0) {
                setBlogs(fetchedBlogs);
            } else {
                setBlogs(prevBlogs => [...prevBlogs, ...fetchedBlogs]);
            }
            setTotalBlogsCount(response.data.totalBlogsCount);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="pt-20 h-full"  style={{ overflowY: 'auto' }}>
            <Box className='overflow-y-scroll' ref={scrollRef} style={{ height: "calc(100% - 10px)" }}>
                {blogs.map((blog) => (
                    <Link to={`/blog/${blog._id}`} key={blog._id}>
                        <BlogItem blog={blog} />
                    </Link>
                ))}
            </Box>

            <Box className='flex justify-center items-center fixed bottom-24 w-full'>
                <Button onClick={onOpen} className='bg-white'>Add Blog</Button>
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
    );
}

export default Blogs;
