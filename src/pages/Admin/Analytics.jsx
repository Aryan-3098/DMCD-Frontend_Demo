import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import Religion from '../../components/data-charts/Religion'
import City from '../../components/data-charts/City'
import AgeGender from '../../components/data-charts/AgeGender'
import { Link } from 'react-router-dom'

const Analytics = () => {
    const user = useSelector(state => state.user.user)
    return (
        <>
            {
                user.usertype === "ADMIN" ? (
                    <Box className='pt-96 lg:pt-0 xl:pt-0 2xl:pt-0 lg:h-full xl:h-full 2xl:h-full lg:grid xl:grid 2xl:grid justify-center items-center w-full grid-cols-3 flex flex-col overflow-x-scroll md:px-10' style={{height:"100dvh"}}>
                        <Box className='col-span-1 '><Link to="/dashboard/analytics/religionChart"><Religion/></Link></Box>
                        <Box className='col-span-1 '><Link to="/dashboard/analytics/cityChart"><City/></Link></Box>
                        <Box className='col-span-1 '><Link to="/dashboard/analytics/ageGenderChart"><AgeGender/></Link></Box>
                    </Box>
                ) : (
                    <Box>This Page is only accessible to admin</Box>
                )
            }
        </>
    )
}

export default Analytics