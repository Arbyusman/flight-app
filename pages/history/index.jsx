import { NavbarComponent, Footer } from "../../components";
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
import promoImages from "../../public/images/images";

export default function History(){
    return(
        <div>
            <NavbarComponent/>
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
        
        
        <div className="flex justify-center ">
        <a href="#" className="block  max-w-screen-md p-6 bg-white h-max border border-gray-200 mt-12 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full ">
        <h5 className="mb-2 text-2xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white">TakeOFF</h5>
        <hr className="my-6 sm:mx-auto border-gray-200 lg:my-8" />
        <p className="font-normal mt-5">Order ID : </p>
        <p className="text-black font-bold ">Jakarta  Padang</p>
        <p className="text-slate-500 mt-5">Round Trip | 2 dewasa , 1 bayi | 16 Desember 2022 | 20 Desember 2022</p>
        </a>
        </div>

        <div className="flex justify-center ">
        <a href="#" className="block  max-w-screen-md p-6 bg-white h-max border border-gray-200 mt-12 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full ">
        <h5 className="mb-2 text-2xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white">TakeOFF</h5>
        <hr className="my-6 sm:mx-auto border-gray-200 lg:my-8" />
        <p className="font-normal mt-5 ">Order ID : </p>
        <p className="text-black font-bold ">Jakarta  Padang</p>
        <p className="text-slate-500 mt-5">Round Trip | 2 dewasa , 1 bayi | 16 Desember 2022 | 20 Desember 2022</p>
        </a>
        </div>

        <div className="flex justify-center ">
        <a href="#" className="block  max-w-screen-md p-6 bg-white h-max border border-gray-200 mt-12 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full ">
        <h5 className="mb-2 text-2xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white">TakeOFF</h5>
        <hr className="my-6 sm:mx-auto border-gray-200 lg:my-8" />
        <p className="font-normal mt-5 ">Order ID : </p>
        <p className="text-black font-bold ">Jakarta  Padang</p>
        <p className="text-slate-500 mt-5">Round Trip | 2 dewasa , 1 bayi | 16 Desember 2022 | 20 Desember 2022</p>
        </a>
        </div>

        <Footer/>
        </div>
    )
}