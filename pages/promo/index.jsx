/* eslint-disable react/no-unescaped-entities */
import React, {useEffect,useState } from "react";
import Navbar from "../../components/navbar";
import {Button} from "flowbite-react"
import Footer from "../../components/footer";
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




const Promo = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch(
      `https://beckend-takeoff-production.up.railway.app/api/v1/promo`,
      {
        method: "GET",
        
      }
    )
      .then((res) => res.json())

      .then((data) => {
        setPromos(data.data);
        console.log("datahere", data);
      });
  }, []);
  



  
    return (
      <div>
        <Navbar />,
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

      <div className=" grid grid-cols-3 gap-3 my-5 mx-20 ">
        
      {promos.map(promos =>(
        // <div key={promos.id}>
        //   {promos.name}
        // </div>
        <div key={promos.id} class="container mx-auto w-full mt-10 transition duration-500 hover:scale-125 w-60 bg-white rounded-lg drop-shadow-xl  dark:bg-gray-800 dark:border-gray-700 ">
          <a href="#">
              <img class="p-8 rounded-t-lg" src={promos.photo} />
          </a>
          <div class="px-5 pb-5">
              <a className="font-bold " name="name" id="name">{promos.name}</a>
              <a href="#">
                  <h5 class="text-xl mt-5 font-semibold tracking-tight text-gray-900 dark:text-white" name="descriptio" id="description">{promos.description}</h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                  <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
              </div>
              {/* <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white  ml-auto" name="discount" id="discount" >{promos.discount}</span>
              </div> */}
              <Button 
                color="failure"
                pill={true} 
                className="w-full">Ambil Voucher</Button>
          </div>
        </div>
      ))}

      </div> 
        <Footer />
      </div>
    );
}

export default Promo;
