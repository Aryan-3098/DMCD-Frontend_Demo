import { Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import bg from '../assets/images/HD-wallpaper-night-riders-bmw-car-cars-city-cyberpunk-furious-lights-old-traffic.jpg'
import { BACKEND_ENDPOINT } from '../constants';
const Home = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const[homeTitle,setHomeTitle]=useState('')
    const [homeText, setHomeText] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_ENDPOINT}gethomedata`);
                setBackgroundImage(response.data.response.homeImage.link);
                setHomeTitle(response.data.response.homeTitle)
                setHomeText(response.data.response.homeText)
            } catch (error) {
                console.error('Error fetching background image:', error);
            }

        };

        fetchData();
    }, []);
    return (
        <Box style={{
            backgroundImage: `url(${backgroundImage?backgroundImage:bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }} className='h-full px-5 grid justify-center items-center grid-rows-2 pt-20'>
            <Box className='text-primary font-serif text-6xl lg:text-8xl lg:px-10 lg:text-center italic row-span-1 mb-10 text-start'> {homeTitle?homeTitle:"Your Ride, Your Rules, We Drive, You Enjoy"}</Box>
            <Box className='lg:grid grid-cols-3 lg:mb-11 mb-5 row-span-2'>
                <Text className='text-white xl:pl-72 xl:pr-96 lg:pl-55 lg:pr-75 px-0 col-span-2 tracking-widest'>"{homeText?homeText:"DriveMyCarDriver in Jamshedpur - Your key to effortless travel. Expert drivers, reliable service, ensuring smooth journey through the streets of jamshedpur"}"</Text>
                <Box className=' mt-0 mb-2 col-span-1'>
                    <Box className='text-green-500'>
                        <Link href="https://api.whatsapp.com/send?phone=+917546910766&text="
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className='border-2 rounded-full py-3 px-10 mt-4'>Book Now</button>
                        </Link>
                    </Box>
                    <div className='text-white mt-2 pl-3'>Available in Jamshedpur</div>
                </Box>
            </Box>
        </Box>
    )
}

export default Home