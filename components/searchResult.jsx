import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Dropdown } from "flowbite-react";
import { IoMdArrowRoundForward, IoIosArrowDropdown } from "react-icons/io";
import {
  MdOutlineLuggage,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";

export default function ResultFlight(props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [data, setData] = useState([]);

  useEffect(() => {
    ticket();
    console.log(props);
  }, []);

  const ticket = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setData(data.data);
        console.log("data", data.data);
      });
  };

  return (
    <div className="justify-center items-center flex-row">
      {/* title */}
      <div className="flex justify-center items-center ">
        <div className="lg:w-9/12 w-full md:w-11/12 flex-row lg:flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
          <div className="text-gray-700">
            <h1 className="font-semibold tracking-wide antialiased text-lg">
              Penerbangan keberangkatan ke bandara makassar
            </h1>
            <div className="flex gap-2 text-sm">
              <p>kam, 8 Des 2022</p>
              <p>|</p>
              <p>1 Traveler</p>
            </div>
          </div>
          <div className="gap-2 flex justify-end lg:items-center lg:justify-center ">
            <Dropdown
              id="filter_tiket"
              label="Filter"
              color="gray"
              className="md:py-2.5 md:px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 "
            >
              <Dropdown.Item>Harga Terendah</Dropdown.Item>
              <Dropdown.Item>Harga Tertinggi</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* end title */}
      {/* ticket */}
      {data.map((item) => (
        <div key={item.id}>
          <div className="flex justify-center ">
            <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:mx-2 lg:p-3">
              <div className="flex-row mx-4 md:mx-2 md:flex items-center  justify-between ">
                <figure className="max-w-md flex md:block md:mb-0 gap-2 mb-1">
                  <Image
                    className="w-7 lg:w-10 flex  "
                    src={item.photo}
                    alt="logo penerbangan"
                    width={100}
                    height={100}
                  ></Image>
                  <figcaption className="mt-2 text-xs  text-gray-500 dark:text-gray-400">
                    {item.Flight.Plane.name}
                  </figcaption>
                </figure>
                <div className="flex items-center gap-1">
                  <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                  <p>{item.type}</p>
                </div>
                <div className="flex items-center gap-4 lg:gap-6 my-1  lg:my-0">
                  <p className="">
                    {new Date(item.Flight.departure_time).getHours()}
                    {" : "}
                    {new Date(item.Flight.departure_time).getMinutes()}
                  </p>
                  <IoMdArrowRoundForward />
                  <p className="">
                    {new Date(item.Flight.arrival_time).getHours()}
                    {" : "}
                    {new Date(item.Flight.arrival_time).getMinutes()}
                  </p>
                </div>

                <div className="flex gap-1 items-center my-1  lg:my-0">
                  <p>RP/ </p>
                  <p>{item.price}</p>
                  <p>/Pax</p>
                </div>
                <div className="flex lg:gap-10 md:gap-3 justify-between">
                  <a href="search/flight">
                    <button
                      type="button"
                      className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 "
                    >
                      Choose Flight
                    </button>
                  </a>

                  <button
                    type="button"
                    className={`text-gray-400 rounded-full my-1 lg:my-0 hover:shadow-2xl hover:bg-gray-100 hover:text-gray-500   ${
                      isOpen && currentIndex === item.id
                        ? "rotate-180 duration-700 "
                        : "rotate-0 duration-700"
                    } `}
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setCurrentIndex(item.id);
                    }}
                  >
                    <IoIosArrowDropdown
                      className="w-full"
                      style={{ width: "25px", height: "25px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ticket desc */}
          <div
            className={`flex justify-center duration-700 ease-in-out overflow-hidden  ${
              isOpen && currentIndex === item.id ? "max-h-auto " : "max-h-0"
            } `}
          >
            <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2   shadow-md p-7 mb-1">
              <div className=" md:flex items-start  justify-between  ">
                <figure className="max-w-md">
                  <Image
                    className="w-10 lg:w-12 flex "
                    src={item.photo}
                    alt="logo penerbangan"
                    width={50}
                    height={50}
                  ></Image>
                  <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                    {item.Flight.Plane.name}
                  </figcaption>
                </figure>
                <div className="flex items-start justify-between  gap-7 md:gap-20 lg:gap-32 text-gray-600 tracking-wide antialiased my-2">
                  <div className="flex-row lg:gap-20 gap-7 items-center">
                    <div className="mb-2">
                      <p className="font-bold text-xl">
                        {new Date(item.Flight.departure_time).getHours()}
                        {" : "}
                        {new Date(item.Flight.departure_time).getMinutes()}
                      </p>
                      <p>
                        {new Date(item.Flight.departure_time).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-xl">
                        {new Date(item.Flight.arrival_time).getHours()}
                        {" : "}
                        {new Date(item.Flight.arrival_time).getMinutes()}
                      </p>
                      <p>{new Date(item.Flight.arrival_time).toDateString()}</p>
                    </div>
                  </div>

                  <div className="flex-row  max-w-sm lg:gap-20 gap-5  items-center">
                    <div className="mb-4">
                      <p className="text-md">
                        {item.Flight.from.city} ({item.Flight.from.city_code})
                      </p>
                      <p className="text-sm">{item.Flight.from.name}</p>
                    </div>
                    <div className=" ">
                      <p className="text-md">
                        {item.Flight.to.city}({item.Flight.to.city_code})
                      </p>
                      <p className="text-sm">{item.Flight.to.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex md:block items-center justify-between gap-7 text-gray-600 tracking-wide antialiased text-sm ">
                  <div>
                    <div className="flex gap-3 items-center my-1 lg:my-3 ">
                      <GiBackpack className="text-xl text-green-500" />
                      <p>Cabin Baggage {item.cabin_baggage}</p>
                    </div>
                    <div className="flex gap-3 items-center my-1 lg:my-3">
                      <MdOutlineLuggage className="text-xl text-blue-500" />
                      <p>Baggage {item.baggage}</p>
                    </div>
                  </div>
                  <div className="lg:mt-2 justify-start flex ">
                    <button className=" flex justify-center border-2  border-red-600 items-center gap-1 px-0.5 py-0.5 md:px-1  antialiased transition duration-300 tracking-normal bg-red-600 rounded-md text-white text-base font-medium hover:bg-white   hover:text-red-600">
                      <BsHeartFill className="" />
                      <p > add to wishlist</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
