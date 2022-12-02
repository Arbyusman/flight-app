import { Navbar, WhyUs, Footer, Banner } from "../components";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// import images
import promoImages from "../public/images/images";

// import swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// import swiper modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-full mx-auto mt-6" id="promo-carousel-home">
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
          className="mySwiper"
        >
          {promoImages.map((promoImage, index) => (
            <SwiperSlide key={index} className="max-w-lg">
              <Image src={promoImage} alt="promo-images" className="w-auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <WhyUs />
      <Banner />
      <Footer />
    </div>
  );
}
