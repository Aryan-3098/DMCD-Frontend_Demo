import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const AboutUs = () => {
    return (
        <Box className='px-6 pt-20 overflow-y-auto h-full'>
            <Box className='mb-2'>
                <Text className='font-bold italic text-xl'>About DriveMyCarDriver</Text>
                <Text className='italic font-semibold text-gray-600 lg:leading-7 leading-none lg:tracking-loose tracking-tighter'>At DriveMyCarDriver, we understand that your time
                    is valuable, and convenience is key. Our mission is to
                    redefine your travel experience by offering a reliable
                    and professional drive service that puts you in control.
                </Text>
            </Box>
            <Box className='mb-2'>
                <Text className='font-bold italic text-xl'>Who We Are</Text>
                <Text className='italic font-semibold text-gray-600 lg:leading-7 leading-none lg:tracking-loose tracking-tighter'>DriveMyCarDriver is a leading provider of personalized
                    chauffeur services, committed to delivering a seamless
                    and enjoyable journey for our clients. With a team of
                    skilled and courteous drivers, we take pride in ensuring
                    that you reach your destination safely and in style.
                </Text>
            </Box>
            <Box className='mb-2'>
                <Text className='font-bold italic text-xl'>What Sets Us Apart</Text>
                <Text className='italic font-semibold text-gray-600 lg:leading-7 leading-none lg:tracking-loose tracking-tighter'>Professionalism: Our drivers are not just chauffeurs;
                    they are trained professionals dedicated to providing
                    top-notch service. From the moment you step into one
                    of our vehicles, expect a level of professionalism that
                    exceeds your expectations.
                </Text>
            </Box>
            <Box className='mb-2'>
                <Text className='font-bold italic text-xl'>Safety First:</Text>
                <Text className='italic font-semibold text-gray-600 lg:leading-7 leading-none lg:tracking-loose tracking-tighter'>Your safety is our priority. We adhere to the highest safety
                    standards, regularly maintaining our fleet of vehicles to
                    ensure a secure and comfortable ride. Our drivers
                    undergo thorough background checks, and we constantly
                    monitor and enhance our safety protocols.
                </Text>
            </Box>
            <Box className='mb-2'>
                <Text className='font-bold italic text-xl'>Convenience Redefined</Text>
                <Text className='italic font-semibold text-gray-600 lg:leading-7 leading-none lg:tracking-loose tracking-tighter'>Say goodbye to the stress of driving, parking, and
                    navigating traffic. DriveMyCarDriver is here to make
                    your journey hassle-free, allowing you to focus on
                    what matters most to you.
                </Text>
            </Box>
            <Box className='mb-2'>
                <Text className='font-bold italic text-xl'>Our Services</Text>
                <Text className='italic font-semibold text-gray-600 lg:leading-7 leading-none tracking-tight'>Personalized Chauffeur: Enjoy the luxury of having a
                    dedicated driver at your service, whether for business
                    meetings, events, or leisure.
                </Text>
            </Box>
        </Box>
    )
}

export default AboutUs