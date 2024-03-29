import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Modal, Alert } from "flowbite-react";
import { IoMdArrowRoundForward, IoIosArrowDropdown } from "react-icons/io";
import {
  MdOutlineLuggage,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import { GiBackpack } from "react-icons/gi";

export default function ResultFlight() {
  const router = useRouter();

  const { from, to, depart, arrival, category } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [userId, setUserId] = useState("");

  const [oneWay, setOneWay] = useState([]);
  const [roundWay, setRoundWay] = useState([]);

  const [selectedTicket1, setSelectedTicket1] = useState("");
  const [selectedTicket2, setSelectedTicket2] = useState("");

  const [openModalError, setOpenModalError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSelectTicketError, setOpenModalSelectTicketError] =
    useState(false);
  const [openModalSelectTicketRound, setOpenModalSelectTicketRound] =
    useState(false);
  const [token, setToken] = useState("");

  const handleGetTicket = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const oneWayTicket = data.data.filter(
          (item) =>
            item.Flight.from.city == from &&
            item.Flight.to.city == to &&
            item.Flight.departure_date == depart &&
            item.type == category
        );
        const roundWayTicket = data.data.filter(
          (item) =>
            item.Flight.from.city == to &&
            item.Flight.to.city == from &&
            item.Flight.departure_date == arrival &&
            item.type == category
        );

        setOneWay(oneWayTicket);
        setRoundWay(roundWayTicket);
      });
  };

  useEffect(() => {
    handleGetTicket();
    whoami();
    const token = localStorage.getItem("token");
    setToken(token);
  }, [router.isReady]);

  const whoami = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setUserId(data.data.id);
      });
  };

  const handelNext = () => {
    if (!selectedTicket1) {
      setOpenModalSelectTicketError(true);
      setTimeout(() => {
        setOpenModalSelectTicketError(false);
      }, 2000);
    } else if (arrival && !selectedTicket2) {
      setOpenModalSelectTicketRound(true);
      setTimeout(() => {
        setOpenModalSelectTicketRound(false);
      }, 2000);
    } else {
      if (!selectedTicket2) {
        Router.push({
          pathname: "/search/book",

          query: {
            ticket1: selectedTicket1[0].id,
          },
        });
      } else {
        Router.push({
          pathname: "/search/book",

          query: {
            ticket1: selectedTicket1[0].id,
            ticket2: selectedTicket2[0].id,
          },
        });
      }
    }
  };

  async function addToWishlist() {
    const ticket_id = currentIndex;
    const user_id = userId;
    const body = { user_id, ticket_id };

    const token = localStorage.getItem("token");
    if (!token) {
      setOpenModalError(true);
      setTimeout(() => {
        setOpenModalError(false);
      }, 1500);
    } else {
      setOpenModal(true);
      const response = await fetch(
        `${process.env.API_ENDPOINT}api/v1/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          body: JSON.stringify(body),
        }
      ).catch((err) => {
        throw err;
      });

      const data = await response.json();

      if (data.status === "OK") {
        setTimeout(() => {
          setOpenModal(false);
        }, 1500);
      }
    }
  }

  return (
    <div className="justify-center items-center flex-row ">
      {/* title */}
      {!token && (
        <div className="justify-center items-center flex ">
          <Alert
            color="info"
            className="shadow-lg my-2 lg:w-5/12 w-full md:w-7/12 text-center "
          >
            <span>
              <span className="font-semibold">you are not logged in!</span>{" "}
              please login to get more experience{" "}
              <Link href="login" className="underline font-semibold">
                {" "}
                login
              </Link>{" "}
              or press the login button above
            </span>
          </Alert>
        </div>
      )}
      <div className="flex justify-center items-center ">
        <div className="lg:w-9/12 w-full md:w-11/12 flex-row lg:flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
          <div className="flex gap-10">
            {!selectedTicket1 && <span>Select Departure Flight </span>}
            {selectedTicket1 &&
              selectedTicket1.map((item) => (
                <div key={item.id}>
                  <h1 className="font-normal tracking-wide antialiased text-base">
                    Flight departing
                    <hr />
                  </h1>
                  <div className="flex gap-5 items-center">
                    <div className="text-sm text-gray-600">
                      <Image
                        priority
                        className="w-7 lg:w-10 flex  "
                        src={item.photo}
                        alt="logo penerbangan"
                        width={100}
                        height={100}
                      />
                      <p className="">
                        {new Date(item.Flight.departure_date).toDateString()}
                      </p>
                    </div>

                    <div className="text-gray-600">
                      <div className="flex items-center gap-1">
                        <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                        <p>{item.type}</p>
                      </div>
                      <div className="flex text-sm items-center gap-1">
                        <p>{item.Flight.from.city_code}</p>
                        <IoMdArrowRoundForward />
                        <p>{item.Flight.to.city_code}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm   lg:my-0">
                        <p className="">{item.Flight.departure_time}</p>
                        <IoMdArrowRoundForward />
                        <p className="">{item.Flight.arrival_time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className="border-l-2"></div>
            {arrival && (
              <div>
                {!selectedTicket2 && <span>Select Return flight</span>}
                {selectedTicket2 &&
                  selectedTicket2.map((item) => (
                    <div key={item.id}>
                      <h1 className="font-normal tracking-wide antialiased text-base">
                        Return flight
                        <hr />
                      </h1>
                      <div className="flex gap-5 items-center">
                        <div className="text-sm text-gray-600">
                          <Image
                            priority
                            className="w-7 lg:w-10 flex  "
                            src={item.photo}
                            alt="logo penerbangan"
                            width={100}
                            height={100}
                          />
                          <p className="">
                            {new Date(
                              item.Flight.departure_date
                            ).toDateString()}
                          </p>
                        </div>

                        <div className="text-gray-600">
                          <div className="flex items-center gap-1">
                            <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                            <p>{item.type}</p>
                          </div>
                          <div className="flex text-sm items-center gap-1">
                            <p>{item.Flight.from.city_code}</p>
                            <IoMdArrowRoundForward />
                            <p>{item.Flight.to.city_code}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm   lg:my-0">
                            <p className="">{item.Flight.departure_time}</p>
                            <IoMdArrowRoundForward />
                            <p className="">{item.Flight.arrival_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={handelNext}
            className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-2 h-10"
          >
            Select Flight
          </button>
        </div>
      </div>
      {oneWay.length > 0 ? (
        <div className="flex justify-center items-center ">
          <div className="lg:w-9/12 w-full md:w-11/12 flex-row lg:flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
            <div className="text-gray-700">
              <h1 className="font-semibold tracking-wide antialiased text-lg">
                Flights departing from {from} to {to}
              </h1>
              <div className="flex gap-2 text-sm">
                <p>{depart}</p>
                <p>|</p>
                <p>{category}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Modal
        size="sm"
        popup={true}
        position={"top-center"}
        show={openModalSelectTicketError}
      >
        <Alert
          color="warning"
          className="justify-center items-center text-center"
        >
          <span className="font-medium">
            The destination flight has not been selected
          </span>
        </Alert>
      </Modal>
      <Modal
        size="sm"
        popup={true}
        position={"top-center"}
        show={openModalSelectTicketRound}
      >
        <Alert
          color="warning"
          className="justify-center items-center text-center"
        >
          <span className="font-medium">
            The Return flight has not been selected
          </span>
        </Alert>
      </Modal>
      <Modal
        show={openModalError}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert
          color="failure"
          className="justify-center items-center text-center"
        >
          <span>
            <span className="font-medium">you are not logged in!</span>
            please login to get more experience
          </span>
        </Alert>
      </Modal>

      <Modal show={openModal} size="sm" popup={true} position={"top-center"}>
        <Alert color="success" className="justify-center items-center">
          <span className="font-medium">
            Successfully added to the wishlist
          </span>
        </Alert>
      </Modal>

      {/* end title */}
      {/* ticket */}
      {oneWay.length > 0 ? (
        oneWay.map((item) => (
          <div key={item.id}>
            <div className="flex justify-center ">
              <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:mx-2 lg:p-3">
                <div className="flex-row mx-4 md:mx-2 md:flex items-center md:h-10 justify-between ">
                  <figure className="max-w-xs  flex md:block md:mb-0 gap-2 mb-1">
                    <Image
                      priority
                      className="w-7 lg:w-10 flex  "
                      src={item.photo}
                      alt="logo penerbangan"
                      width={100}
                      height={100}
                    />
                    <figcaption className="text-xs  text-gray-500 dark:text-gray-400">
                      {item.Flight.Plane.name}
                    </figcaption>
                  </figure>
                  <div className="flex items-center gap-1">
                    <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                    <p>{item.type}</p>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-6 my-1  lg:my-0">
                    <p className="">{item.Flight.departure_time}</p>
                    <IoMdArrowRoundForward />
                    <p className="">{item.Flight.arrival_time}</p>
                  </div>

                  <div className="flex gap-1 items-center my-1  lg:my-0">
                    <p>RP/ </p>
                    <p>{item.price}</p>
                    <p>/Pax</p>
                  </div>
                  <div className="flex lg:gap-10 md:gap-3 justify-between">
                    <div>
                      <button
                        onClick={() => {
                          setSelectedTicket1([item]);
                        }}
                        type="button"
                        className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 transition"
                      >
                        Choose Flight
                      </button>
                    </div>

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
                      priority
                      className="w-10 lg:w-16 flex "
                      src={item.photo}
                      alt="logo penerbangan"
                      width={50}
                      height={50}
                    />
                    <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                      {item.Flight.Plane.name}
                    </figcaption>
                  </figure>
                  <div className="flex items-start justify-between  gap-7 md:gap-20 lg:gap-32 text-gray-600 tracking-wide antialiased my-2">
                    <div className="flex-row lg:gap-20 gap-7 items-center">
                      <div className="mb-2">
                        <p className="font-bold text-xl">
                          {item.Flight.departure_time}
                        </p>
                        <p>
                          {new Date(item.Flight.departure_date).toDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-xl">
                          {item.Flight.arrival_time}
                        </p>
                        <p>
                          {new Date(item.Flight.arrival_date).toDateString()}
                        </p>
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
                        <p>Cabin Baggage {item.cabin_baggage} KG</p>
                      </div>
                      <div className="flex gap-3 items-center my-1 lg:my-3">
                        <MdOutlineLuggage className="text-xl text-blue-500" />
                        <p>Baggage {item.baggage} KG</p>
                      </div>
                    </div>
                    <div className="lg:mt-2 justify-start flex ">
                      <button
                        onClick={addToWishlist}
                        className=" flex justify-center border-2  border-red-600 items-center gap-1 px-0.5 py-0.5 md:px-1  antialiased transition duration-300 tracking-normal bg-red-600 rounded-md text-white text-base font-medium hover:bg-white   hover:text-red-600"
                      >
                        <BsHeartFill className="" />
                        <p> add to wishlist</p>
                      </button>
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
            Flights departing not found
          </p>
        </div>
      )}

      {arrival && (
        <div className="flex justify-center items-center ">
          {roundWay.length > 0 ? (
            <div className="lg:w-9/12 w-full md:w-11/12 flex-row lg:flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
              <div className="text-gray-700">
                <h1 className="font-semibold tracking-wide antialiased text-lg">
                  Return flight from {to} To {from}
                </h1>
                <div className="flex gap-2 text-sm">
                  <p>{arrival}</p>
                  <p>|</p>
                  <p>{category}</p>
                </div>
              </div>
              <div className="gap-2 flex justify-end lg:items-center lg:justify-center "></div>
            </div>
          ) : (
            <div className="flex justify-center items-center my-5">
              <p className="text-xl font-normal text-gray-900">
                Return flight not found
              </p>
            </div>
          )}
        </div>
      )}

      {roundWay.length > 0 ? (
        roundWay.map((item) => (
          <div key={item.id}>
            <div className="flex justify-center ">
              <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:mx-2 lg:p-3">
                <div className="flex-row mx-4 md:mx-2 md:flex items-center md:h-10 justify-between ">
                  <figure className="max-w-md flex md:block md:mb-0 gap-2 mb-1">
                    <Image
                      priority
                      className="w-7 lg:w-10 flex  "
                      src={item.photo}
                      alt="logo penerbangan"
                      width={100}
                      height={100}
                    />
                    <figcaption className="mt-2 text-xs  text-gray-500 dark:text-gray-400">
                      {item.Flight.Plane.name}
                    </figcaption>
                  </figure>
                  <div className="flex items-center gap-1">
                    <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                    <p>{item.type}</p>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-6 my-1  lg:my-0">
                    <p className="">{item.Flight.departure_time}</p>
                    <IoMdArrowRoundForward />
                    <p className="">{item.Flight.arrival_time}</p>
                  </div>

                  <div className="flex gap-1 items-center my-1  lg:my-0">
                    <p>RP/ </p>
                    <p>{item.price}</p>
                    <p>/Pax</p>
                  </div>
                  <div className="flex lg:gap-10 md:gap-3 justify-between">
                    <div>
                      <button
                        onClick={() => {
                          setSelectedTicket2([item]);
                        }}
                        type="button"
                        className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 transition"
                      >
                        Choose Flight
                      </button>
                    </div>

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
                      priority
                      className="w-10 lg:w-12 flex "
                      src={item.photo}
                      alt="logo penerbangan"
                      width={50}
                      height={50}
                    />
                    <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                      {item.Flight.Plane.name}
                    </figcaption>
                  </figure>
                  <div className="flex items-start justify-between  gap-7 md:gap-20 lg:gap-32 text-gray-600 tracking-wide antialiased my-2">
                    <div className="flex-row lg:gap-20 gap-7 items-center">
                      <div className="mb-2">
                        <p className="font-bold text-xl">
                          {item.Flight.departure_time}
                        </p>
                        <p>
                          {new Date(item.Flight.departure_date).toDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-xl">
                          {item.Flight.arrival_time}
                        </p>
                        <p>
                          {new Date(item.Flight.arrival_date).toDateString()}
                        </p>
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
                        <p>Cabin Baggage {item.cabin_baggage} KG</p>
                      </div>
                      <div className="flex gap-3 items-center my-1 lg:my-3">
                        <MdOutlineLuggage className="text-xl text-blue-500" />
                        <p>Baggage {item.baggage} KG</p>
                      </div>
                    </div>
                    <div className="lg:mt-2 justify-start flex ">
                      <button
                        onClick={addToWishlist}
                        className=" flex justify-center border-2  border-red-600 items-center gap-1 px-0.5 py-0.5 md:px-1  antialiased transition duration-300 tracking-normal bg-red-600 rounded-md text-white text-base font-medium hover:bg-white   hover:text-red-600"
                      >
                        <BsHeartFill className="" />
                        <p> add to wishlist</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center my-5">
          <p className="text-xl font-normal text-gray-900"></p>
        </div>
      )}
    </div>
  );
}
