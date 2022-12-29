import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
import {
  MdOutlineLuggage,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";

import { GiBackpack } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import { HiArrowSmLeft } from "react-icons/hi";
import Image from "next/image";

export default function HistoryBooking() {
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
    getTransaction();
    setLoading(false);
  }, [router.isReady]);

  const getTransaction = () => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.API_ENDPOINT}api/v1/transaction/history/${id}`, {
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
        <div className="lg:w-9/12 md:w-11/12 w-full flex  bg-white rounded-md mt-5 justify-between shadow-md p-7">
          <div className="text-gray-700">
            <h1 className="font-semibold tracking-wide antialiased text-lg">
              Flight history
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
      {/* end title */}
      {/* ticket */}

      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <div className="flex justify-center ">
              <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:p-3">
                <div className="flex mx-2 md:flex items-center md:h-10 justify-between ">
                  <p>Ticket ID : {item.Ticket.id}</p>
                  <div className="flex items-center gap-1">
                    <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                    <p>{item.Ticket.type}</p>
                  </div>
                  <p>
                    {new Date(item.Ticket.Flight.departure_date).toLocaleString(
                      "default",
                      { month: "long" }
                    )}{" "}
                    {new Date(item.Ticket.Flight.departure_date).getFullYear()}
                  </p>

                  <div className=" gap-1 items-center hidden sm:flex">
                    <p>RP/ </p>
                    <p>{item.Ticket.price}</p>
                    <p>/Pax</p>
                  </div>
                  <div className="flex lg:gap-10 md:gap-3 md:justify-between justify-end">
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
              className={`flex justify-center duration-700 ease-in-out overflow-hidden ${
                isOpen && currentIndex === item.id ? "max-h-auto " : "max-h-0"
              } `}
            >
              <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2  border-b-gray-300 border  shadow-md p-7">
                <div className=" md:flex items-start  justify-between  ">
                  <figure className="max-w-md">
                    <Image
                      className="w-10 lg:w-16 flex "
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
                <div className="flex-row md:flex justify-between gap-5 mt-6">
                  <div className="gap-7 w-full text-gray-600 tracking-wide antialiased text-sm mb-2 md:mb-0 ">
                    <div className="flex gap-2">
                      <BsPerson className="text-2xl font-bold  text-gray-700 " />
                      <h1 className="text-md font-bold antialiased tracking-wider text-gray-700">
                        Traveler Information
                      </h1>
                    </div>
                    <hr></hr>
                    <div className="flex gap-3 items-center my-1 lg:my-3">
                      <p>Name :</p>
                      <p>
                        {item.User.firstName} {item.User.lastName}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center my-1 lg:my-3">
                      <p>Phone :</p>
                      <p>{item.User.phone}</p>
                    </div>
                    <div className="flex items-start gap-3  my-1 lg:my-3">
                      <p>address:</p>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-600  border-none  rounded-sm  border-gray-300 "
                        defaultValue={item.User.address}
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex border-b-2 mb-2 md:hidden"></div>
                  <div className="border-l-2 border-gray-300"></div>
                  <div className="w-full items-center justify-between flex-row   bg-white  text-gray-600 tracking-wide antialiased mb-2">
                    <div className="w-full   flex-row md:flex justify-between ">
                      <h1 className="text-md font-bold antialiased tracking-wider text-gray-700">
                        Price Detail
                      </h1>
                    </div>
                    <hr></hr>
                    <div className="">
                      <div className="font-thin gap-5 my-2 text-sm flex justify-between">
                        <div className="flex items-center gap-2 ">
                          <p>Depart</p>
                          <p>{item.Ticket.Flight.from.city_code}</p>
                          <p>{item.Ticket.Flight.to.city_code}</p>
                        </div>
                        <p>RP {item.Ticket.price} </p>
                      </div>

                      <div className="flex justify-between text-sm font-thin my-1">
                        <p>promo </p>
                        <p>RP </p>
                      </div>
                      <div className="flex justify-between text-sm font-thin my-1"></div>
                      <hr />
                      <div className="flex justify-between text-sm font-bold tracking-wider my-2">
                        <p>Total Price</p>
                        <p>RP {item.Ticket.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center my-5">
          <p className="text-xl font-normal text-gray-900">No flight history</p>
        </div>
      )}
    </div>
  );
}
