import React from "react";
import Slider from "react-slick";
import BlogCarouselItem from "./BlogCarouseltem";
import { Box } from "@chakra-ui/react";

const Carousel = ({ blogs }) => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", color: "#f8bf50" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", color: "#f8bf50" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: blogs.length>2?3:blogs.length,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <Box className="slider-container" style={{ width: "75%", height: "100px" }}>
            <Slider {...settings}>
                {blogs.map((blog) => (
                    <BlogCarouselItem blog={blog} key={blog._id} />
                ))}
            </Slider>
        </Box>
    );
}

export default Carousel;
