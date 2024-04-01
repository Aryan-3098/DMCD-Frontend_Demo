import axios from "axios";
import { BACKEND_ENDPOINT } from "../constants";

export const fetchUserData = async (userID) => {
    try {
        const response = await axios.get(`${BACKEND_ENDPOINT}user/${userID}`);
        return (response.data)
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};