import { Box, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const HomeLoadingSkeleton = () => {
  return (
    <>
      <Box className="h-full w-full pt-8">
        <Box className="w-full flex justify-center items-center">
          <Skeleton style={{ height: "12px", width: "30%" }} />
        </Box>
        <Stack className="px-5 pt-8">
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
        </Stack>
        <Box className="grid grid-cols-2 pt-10">
          <Stack className="col-span-1 px-5 ">
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
          </Stack>
          <Stack className="col-span-1 px-5">
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
          </Stack>
        </Box>
        <Box>
        <Stack className="px-5 pt-10">
            <Skeleton style={{ height: "12px", width: "50%" }} />
            <Skeleton style={{ height: "12px", width: "50%" }} />
            <Skeleton style={{ height: "12px", width: "50%" }} />
            <Skeleton style={{ height: "12px", width: "50%" }} />
          </Stack>
        </Box>
        <Stack className="px-5 pt-8">
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
        </Stack>
      </Box>
    </>
  );
};

export default HomeLoadingSkeleton;
