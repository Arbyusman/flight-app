import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropdown, IoMdArrowRoundForward } from "react-icons/io";
import {
  MdOutlineLuggage,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { HiArrowSmLeft } from "react-icons/hi";

import { GiBackpack } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

export default function Wishlist() {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    wishlist();
    setLoading(false);
  }, [router.isReady]);

  const wishlist = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/wishlist/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      <div className="flex justify-center items-center">
        <div className="lg:w-9/12 md:w-11/12 w-full flex-row  bg-white rounded-md mt-5 justify-between shadow-md p-7">
          <div className="text-gray-700 flex justify-between items-center">
            <div className="flex-row">
              <h1 className="font-semibold tracking-wide antialiased text-lg">
                Wishlist
              </h1>
            </div>
            <Link
              href="/"
              className="flex text-gray-600 hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 text-center gap-1"
            >
              <HiArrowSmLeft className="text-xl" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>
      {/* end title */}
      {/* ticket */}

      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <div className="flex justify-center ">
              <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:p-3">
                <div className="flex-row mx-4 md:mx-2 md:flex items-center  justify-between  ">
                  <figure className="max-w-md flex md:block md:mb-0 gap-2 mb-1">
                    <Image
                      className="w-7 lg:w-10 flex  "
                      src={item.Ticket.photo}
                      alt="logo penerbangan"
                      width={100}
                      height={100}
                    ></Image>
                    <figcaption className="mt-2 text-xs  text-gray-500 dark:text-gray-400">
                      {item.Ticket.Flight.Plane.name}
                    </figcaption>
                  </figure>
                  <div className="flex items-center gap-1">
                    <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                    <p>{item.Ticket.type}</p>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-6 my-1  lg:my-0">
                    <p className="">{item.Ticket.Flight.departure_time}</p>
                    <IoMdArrowRoundForward />
                    <p className="">
                      {" : "}
                      {item.Ticket.Flight.arrival_time}
                    </p>
                  </div>

                  <div className="flex gap-1 items-center my-1  lg:my-0">
                    <p>RP/ </p>
                    <p>{item.Ticket.price}</p>
                    <p>/Pax</p>
                  </div>
                  <div className="flex lg:gap-10 md:gap-3 justify-between">
                    <Link href={`search/flight/${item.ticket_id}`}>
                      <button
                        type="button"
                        className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 "
                      >
                        Choose Flight
                      </button>
                    </Link>

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

            <div
              className={`flex justify-center duration-700 ease-in-out overflow-hidden  ${
                isOpen && currentIndex === item.id
                  ? "max-h-auto lg:max-h-56"
                  : "max-h-0"
              } `}
            >
              <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2   shadow-md p-7 mb-1">
                <div className=" md:flex items-start  justify-between  ">
                  <figure className="max-w-md">
                    <Image
                      className="w-10 lg:w-12 flex "
                      src={item.Ticket.photo}
                      alt="logo penerbangan"
                      width={50}
                      height={50}
                    ></Image>
                    <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                      {item.Ticket.Flight.Plane.name}
                    </figcaption>
                  </figure>
                  <div className="flex items-start  justify-between gap-7 md:gap-20 lg:gap-32 text-gray-600 tracking-wide antialiased my-2">
                    <div className="flex-row lg:gap-20 gap-7 items-center">
                      <div className="mb-2">
                        <p className="font-bold text-xl">
                          {item.Ticket.Flight.departure_time}
                        </p>
                        <p>
                          {new Date(
                            item.Ticket.Flight.departure_date
                          ).toDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-xl">
                          {item.Ticket.Flight.arrival_time}
                        </p>
                        <p>
                          {new Date(
                            item.Ticket.Flight.arrival_date
                          ).toDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex-row  max-w-sm lg:gap-20 gap-5  items-center">
                      <div className="mb-4">
                        <p className="text-md">
                          {item.Ticket.Flight.from.city} (
                          {item.Ticket.Flight.from.city_code})
                        </p>
                        <p className="text-sm">
                          {item.Ticket.Flight.from.name}
                        </p>
                      </div>
                      <div className=" ">
                        <p className="text-md">
                          {item.Ticket.Flight.to.city}(
                          {item.Ticket.Flight.to.city_code})
                        </p>
                        <p className="text-sm">{item.Ticket.Flight.to.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="gap-7 text-gray-600 tracking-wide antialiased text-sm ">
                    <div className="flex gap-3 items-center my-1 lg:my-3 ">
                      <GiBackpack className="text-xl text-green-500" />
                      <p>Cabin Baggage {item.Ticket.cabin_baggage}</p>
                    </div>
                    <div className="flex gap-3 items-center my-1 lg:my-3">
                      <MdOutlineLuggage className="text-xl text-blue-500" />
                      <p>Baggage {item.Ticket.baggage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center my-5">
          <p className="text-xl font-normal text-gray-900">
            No ticket wishlist
          </p>
        </div>
      )}
    </div>
  );
}
