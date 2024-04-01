import { Box } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Box className='bg-seconday lg:py-2 py-0 absolute bottom-0 w-full z-20' style={{ height: '80px' }}>
            <Box className='grid lg:grid-cols-3 grid-cols-2'>
                <Box className='flex justify-center lg:col-span-2 col-span-1 font-mono'>
                    <Box className='bg-white font-extrabold text-secondary px-1.5 my-5 mx-0.5'>D</Box>
                    <Box className='bg-white font-bold text-secondary px-1.5 my-5 mx-0.5'>M</Box>
                    <Box className='bg-white font-bold text-secondary px-1.5 my-5 mx-0.5'>C</Box>
                    <Box className='bg-white font-bold text-secondary px-1.5 my-5 mx-0.5'>D</Box>
                </Box>
                <Box className='flex justify-center items-center col-span-1 text-white font-serif font-extralight'>DRIVEMYCARDRIVER</Box>
            </Box>
        </Box>
    )
}

export default Footer