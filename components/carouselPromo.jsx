import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// import swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// import swiper modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";

// import images
import promoImages from "../public/images/images";

const CarouselPromo = () => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="mySwiper px-6"
    >
      {promoImages.map((promoImage, index) => (
        <SwiperSlide key={index} className="max-w-lg">
          <Image src={promoImage} alt="promo-images" className="w-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselPromo;
