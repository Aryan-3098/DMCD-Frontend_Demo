import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const user = useSelector(state => state.user.user)
    return (
        <>
            {user.usertype === "ADMIN" ? (
                <Box className='grid justify-center items-center grid-cols-2 grid-rows-2 gap-4 h-full pt-20'>
                    <Box className='col-span-1 flex justify-center items-center flex-col mx-4 h-full'>
                        <Text className='font-bold text-lg my-3 text-blue-500'>DASHBOARD</Text>
                        <Link to="/dashboard/blogs" className='bg-blue-800 rounded-xl flex justify-center items-center' style={{ height: "70%", width: '100%' }}>
                            <Box className='font-bold text-white'>BLOGS</Box>
                        </Link>
                    </Box>
                    <Box className='col-span-1 flex justify-center items-center mx-4 h-full'>
                        <Link to="/dashboard/customise" className='bg-red-600 rounded-xl flex justify-center items-center' style={{ height: "80%", width: '100%' }}>
                            <Box className='font-bold text-white'>CUSTOMISE</Box>
                        </Link>
                    </Box>
                    <Box className='col-span-2 flex justify-center items-center h-full flex-col'>
                        <Text className='font-bold text-xl my-3 text-green-500'>ANALYTICS</Text>
                        <Link to="/dashboard/analytics" className='bg-cyan-400 rounded-xl flex justify-center items-center' style={{ height: "80%", width: "80%" }}></Link>
                    </Box>
                </Box>
            ) : (
                <Box>This Page is only accessible to admin</Box>
            )}
        </>
    )
}

export default Dashboard