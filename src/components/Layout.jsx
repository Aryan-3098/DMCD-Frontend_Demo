import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box, Text } from '@chakra-ui/react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../helper/fetchUser.js';
import { setUser } from '../store/actions/userActions.js';
import HomeLoadingSkeleton from "./Loading/HomeLoadingSkeleton.jsx";


const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let user = useSelector(state => state.user)
    let userLoading=useSelector(state => state.userLoading)
    const location = useLocation();
    const token = Cookies.get('token');
    useEffect(() => {
        const verifyToken = () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if (decodedToken.exp < currentTime) {
                        navigate('/signin-signup');
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    navigate('/signin-signup');
                }
            } else {
                navigate('/signin-signup');
            }
        };

        verifyToken();
    }, [navigate]);
    if (token) {
        if(userLoading){
            return (
                <HomeLoadingSkeleton/>
            )
        }
        else if (user && user !== null && user.user && user.user !== null) {
            return (
                <Box>
                    <Header user={user.user} />
                    <Box style={{ height: "calc(100dvh - 80px)" }}>
                        {children}
                    </Box>
                    <Footer />
                </Box>
            )
        } else {
            const userID = localStorage.getItem('userID');
            if (userID && userID != null) {
                (async () => {
                    try {
                        const userData = await fetchUserData(userID);
                        dispatch(setUser(userData))
                    } catch (error) {
                        console.error('Error fetching or processing user data:', error);
                    }
                })();
            }
            else{
                navigate("/signin-signup")
            }
        }
    }
    else {
        return (<></>)
    }
}

export default Layout