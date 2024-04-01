import React from 'react'
import Religion from '../../../components/data-charts/Religion'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux';

const ReligionChart = () => {
  const user = useSelector(state => state.user.user)
  return user.usertype === "ADMIN" ? (
    <Box className="h-full pt-10 flex justify-center items-center">
      <Religion/>
    </Box>
  ) : (
    <Box>This Page is only accessible to admin</Box>
  );
};

export default ReligionChart