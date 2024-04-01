import React, { useEffect, useState } from 'react';
import { Box, Image, UnorderedList, ListItem, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../constants';

const BlogDetailed = () => {
    const { blogid } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_ENDPOINT}fetchblog/${blogid}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [blogid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    const highlights = JSON.parse(blog.highlights);

    return (
        <>
            <Box className='grid grid-rows-2 rounded-lg overflow-y-auto h-full '>
                <Box className='w-full row-span-1' style={{
                    backgroundImage: `url(${blog.image.link})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: "50dvh"
                }} />
                <Box className='row-span-1 bg-gray-400 p-5' style={{borderRadius:'3rem 3rem 0px 0px'}}>
                        <Box className='bg-white inline-block drop-shadow-2xl px-3 py-1 relative left-2/3 bottom-9 rounded-3xl'><Text className='text-green-500'>Subscribe</Text></Box>
                    <UnorderedList mt="2" className='col-span-2'>
                        {highlights.map((highlight, index) => (
                            <ListItem className='font-bold' key={index}>{highlight}</ListItem>
                        ))}
                    </UnorderedList>
                    <Box className='mt-5 text-gray-700'>{blog.postStory}</Box>
                </Box>
            </Box>
        </>
    );
};

export default BlogDetailed;