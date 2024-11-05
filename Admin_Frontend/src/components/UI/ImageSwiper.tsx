import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Swiper as SwiperType } from "swiper/types";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

interface ImageSliderProps {
  images?: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images = [] }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper?.activeIndex);
  };

  const imagesCount = images.length;

  return (
    <div className="relative h-[37vh] w-full">
      <Swiper
        className="mySwiper w-full relative flex border-[2px] rounded-lg items-center justify-center"
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        keyboard={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="object-cover h-[37vh] rounded-lg w-full  "
              src={image}
              alt={`Product-image-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <span className=" flex  items-center justify-between p-1 rounded-md  z-20  absolute cursor-pointer text-white bg-black  bg-opacity-50 bottom-2 left-[50%] transform -translate-x-[50%]  cursor-pointe">
        {currentIndex + 1}/{imagesCount}
      </span>
      <div
        onClick={handlePrev}
        className=" absolute left-2 top-1/2 transform -translate-y-1/2 bg-white  text-black p-1 rounded-full cursor-pointer z-10"
      >
        <ArrowLeft01Icon size={22} />
      </div>
      <div
        onClick={handleNext}
        className=" absolute right-2 top-1/2 transform -translate-y-1/2 bg-white  text-black p-1 rounded-full cursor-pointer z-10"
      >
        <ArrowRight01Icon size={22} />
      </div>
    </div>
  );
};

export default ImageSlider;
