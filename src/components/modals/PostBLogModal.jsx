import { useRef, useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, InputGroup, InputRightElement, Spinner, Textarea, useToast } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../../constants';

const PostBlogModal = ({ onClose }) => {
    const [image, setImage] = useState('');
    const [highlights, setHighlights] = useState(['']);
    const [postStory, setPostStory] = useState('');
    const [loading,setLoading]=useState(false)
    const imageInputRef = useRef(null);
    const toast=useToast()

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const addHighlight = () => {
        setHighlights([...highlights, '']);
    };

    const removeHighlight = (index) => {
        const updatedHighlights = [...highlights];
        updatedHighlights.splice(index, 1);
        setHighlights(updatedHighlights);
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('highlights', JSON.stringify(highlights));
            formData.append('postStory', postStory);
            const response = await axios.post(`${BACKEND_ENDPOINT}postBlog`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImage('');
            setHighlights(['']);
            setPostStory('');
            imageInputRef.current.value = '';
            if (response.status === 200) {
                setTimeout(() => {
                    toast({
                        title: 'Post Succesfull',
                        description: `Blog was posted succesfull`,
                        status: 'success',
                        variant: 'subtle',
                        duration: 5000,
                        position: 'top',
                        isClosable: false
                    });
                    setLoading(false)
                    window.location.reload()
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting blog post:', error);
            toast({
                title: 'Error Posting Blog',
                description: `Check file size or Try Again`,
                status: 'error',
                variant: 'subtle',
                duration: 5000,
                position: 'top',
                isClosable: true
            });
            setLoading(false)
        }
    };

    return (
        <Box className='bg-primary p-5 mb-3 rounded-xl shadow-2xl border border-seconday' maxW="md" mx="auto">
            <Input type="file" className='bg-white p-1' ref={imageInputRef} onChange={handleImageChange} mb={4} />
            {highlights.map((highlight, index) => (
                <div key={index}>
                    <InputGroup>
                        <Input
                            value={highlight}
                            onChange={(e) => {
                                const updatedHighlights = [...highlights];
                                updatedHighlights[index] = e.target.value;
                                setHighlights(updatedHighlights);
                            }}
                            placeholder="Enter highlights"
                            mb={2}
                            className='bg-white'
                        />
                        <InputRightElement>
                            <Button className='float-right mr-1' size="sm" colorScheme="red" onClick={() => removeHighlight(index)}>
                                <DeleteIcon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </div>
            ))}
            <Box className='flex justify-center items-center'>
                <Button className="float-right" size="sm" colorScheme="green" onClick={addHighlight} mb={4}>
                    <AddIcon />
                </Button>
            </Box>
            <Textarea
                value={postStory}
                onChange={(e) => setPostStory(e.target.value)}
                placeholder="Enter your story"
                rows={6}
                resize="vertical"
                mb={4}
            />
                        {loading ? (
                <Spinner />
            ) : (
                <Button _hover={{ bgColor: "#271801", textColor: "white" }} onClick={handleSubmit}>
                    Submit
                </Button>
            )}
        </Box>
    );
};

export default PostBlogModal;