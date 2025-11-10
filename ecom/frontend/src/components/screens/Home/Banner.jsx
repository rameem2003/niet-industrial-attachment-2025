import React from "react";
import Slider from "react-slick";
import banner from "../../../assets/banner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 2000,
    // cssEase: "linear",
  };
  return (
    <section className=" overflow-hidden">
      {/* <div className="slider-container"> */}
      <Slider {...settings}>
        <div className=" relative h-[500px] lg:h-[850px] w-full">
          <img className=" w-full h-full" src={banner} alt="Banner" />

          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[700px] w-[300px] md:w-[700px] px-2 py-[63px] lg:px-[95px] bg-white/50 backdrop-blur-sm">
            <h2 className=" text-3xl text-black font-medium text-center">
              The nature candle
            </h2>

            <p className=" font-medium text-sm text-black text-center w-full md:w-[537px] mx-auto">
              All handmade with natural soy wax, Candleaf is a companion for all
              your pleasure moments{" "}
            </p>

            <div className=" text-center">
              <button className=" px-4 lg:px-[44px] py-2 bg-green-600 text-white mx-auto mt-10">
                Discovery our collection
              </button>
            </div>
          </div>
        </div>

        <div className=" relative h-[500px] lg:h-[850px] w-full">
          <img className=" w-full h-full" src={banner} alt="Banner" />

          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[700px] w-[300px] md:w-[700px] px-2 py-[63px] lg:px-[95px] bg-white/50 backdrop-blur-sm">
            <h2 className=" text-3xl text-black font-medium text-center">
              The nature candle
            </h2>

            <p className=" font-medium text-sm text-black text-center w-full md:w-[537px] mx-auto">
              All handmade with natural soy wax, Candleaf is a companion for all
              your pleasure moments{" "}
            </p>

            <div className=" text-center">
              <button className=" px-4 lg:px-[44px] py-2 bg-green-600 text-white mx-auto mt-10">
                Discovery our collection
              </button>
            </div>
          </div>
        </div>
      </Slider>
      {/* </div> */}
    </section>
  );
};

export default Banner;
