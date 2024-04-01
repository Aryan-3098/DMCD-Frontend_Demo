import React from "react";
import AgeGender from "../../../components/data-charts/AgeGender";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AgeGenderChart = () => {
  const user = useSelector(state => state.user.user)
  return user.usertype === "ADMIN" ? (
    <Box className="h-full pt-10 flex justify-center items-center">
      <AgeGender />
    </Box>
  ) : (
    <Box>This Page is only accessible to admin</Box>
  );
};

export default AgeGenderChart;
