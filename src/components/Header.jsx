import { Button, Drawer, DrawerBody, Text, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure, Box, DrawerFooter, DrawerHeader } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { clearUser } from '../store/actions/userActions'

const Header = ({ user }) => {
    const dispath = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const handleNavigate = (route) => {
        navigate(route);
        onClose();
    };

    const handleLogOut = () => {
        Cookies.remove('token')
        localStorage.clear();
        localStorage.clear()
        dispath(clearUser());
        navigate("/signin-signup")
    }


    return (
        <Box className={`fixed flex justify-center items-center w-full ${location.pathname.includes("careers")?'bg-white':''}`} style={{ height: "80px" }}>
            <Box className={`absolute ${location.pathname.includes('/home') ? 'right-3' : 'left-3'}`} >
                <Button id='menuBtn' style={{ color: location.pathname.includes("/home") ? "white" : "black", background: "transparent" }} ref={btnRef} onClick={onOpen}>
                    <HamburgerIcon w={8} h={8} />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement={location.pathname.includes('/home') ? 'left' : 'right'}
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent >
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Box>{user.name}</Box>
                            <Box>{user.email}</Box>
                        </DrawerHeader>

                        <DrawerBody className='flex justify-center items-center flex-col bg-transparent'>
                            <Button variant='ghost' my={3} _hover={{ bgColor: "#4D2A00", textColor: "white" }} onClick={() => handleNavigate("/home")}>
                                <Text className='font-bold text-xl'>Home</Text>
                            </Button>
                            <Button variant='ghost' my={3} _hover={{ bgColor: "#4D2A00", textColor: "white" }} onClick={() => handleNavigate("/blogs")}>
                                <Text className='font-bold text-xl'>Blogs</Text>
                            </Button>
                            <Button variant='ghost' my={3} _hover={{ bgColor: "#4D2A00", textColor: "white" }} onClick={() => handleNavigate("/careers")}>
                                <Text className='font-bold text-xl'>Careers</Text>
                            </Button>
                            <Button variant='ghost' my={3} _hover={{ bgColor: "#4D2A00", textColor: "white" }} onClick={() => handleNavigate("/about-us")}>
                                <Text className='font-bold text-xl'>About Us</Text>
                            </Button>
                            {user && user.usertype === "ADMIN" ? <Button variant='ghost' my={3} _hover={{ bgColor: "#4D2A00", textColor: "white" }} onClick={() => handleNavigate("/dashboard")}>
                                <Text className='font-bold text-xl'>Dashboard</Text>
                            </Button> : ""}
                        </DrawerBody>
                        <DrawerFooter>
                            <Button colorScheme='red' onClick={() => handleLogOut()}>Log Out</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
            {
                location.pathname !== "/home" ?
                    <Box className='py-7 flex justify-center font-bold text-2xl z-10'>DRIVEMY<Text className='text-red-500'>CAR</Text>DRIVER</Box> : ""
            }
        </Box >
    )
}

export default Header