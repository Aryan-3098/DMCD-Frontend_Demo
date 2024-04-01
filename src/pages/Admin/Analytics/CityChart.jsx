import React from 'react'
import City from '../../../components/data-charts/City'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux';

const CityChart = () => {
  const user = useSelector(state => state.user.user)
  return user.usertype === "ADMIN" ? (
    <Box className="h-full pt-10 flex justify-center items-center">
      <City/>
    </Box>
  ) : (
    <Box>This Page is only accessible to admin</Box>
  );
};

export default CityChart