import { Box, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

const BlogsLoadingSkeleton = () => {
  return (
    <>
    <Box className="h-full w-full pt-8">
        <Box className="w-full flex justify-center items-center">
          <Box></Box>
        </Box>
        <Stack className="px-5 pt-8">
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
          <Skeleton style={{ height: "12px", width: "100%" }} />
        </Stack>
        <Box className="grid grid-cols-4 pt-10">
          <Stack className="col-span-3 px-5 ">
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
          </Stack>
          <Stack className="col-span-1 px-5 flex justify-center items-end">
            <SkeletonCircle className='mr-10'  style={{height:"69px",width:"69px"}}/>
          </Stack>
        </Box>
        <Box className="grid grid-cols-4 pt-10">
          <Stack className="col-span-3 px-5 ">
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
          </Stack>
          <Stack className="col-span-1 px-5 flex justify-center items-end">
            <SkeletonCircle className='mr-10'  style={{height:"69px",width:"69px"}}/>
          </Stack>
        </Box>
        <Box className="grid grid-cols-4 pt-10">
          <Stack className="col-span-3 px-5 ">
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
            <Skeleton style={{ height: "12px", width: "100%" }} />
          </Stack>
          <Stack className="col-span-1 px-5 flex justify-center items-end">
            <SkeletonCircle className='mr-10'  style={{height:"69px",width:"69px"}}/>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default BlogsLoadingSkeleton