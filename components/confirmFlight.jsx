import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineLuggage } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import { Button } from "flowbite-react";
import Image from "next/image";

export default function ConfirmFlight() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState([]);

  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    whoami();
    ticket();
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
        setEmail(data.data.email);
        setfirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setAddress(data.data.address);
        setPhone(data.data.phone);
      });
  };

  const ticket = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setData(data.data);
        console.log("ticket", data.data);
      });
  };

  return (
    <div className="justify-center items-center flex">
      <div className="lg:flex mt-5 gap-3 w-full md:w-11/12 lg:w-9/12 flex-row ">
        <div className=" w-full lg:w-8/12 ">
          {/* Traveler Information */}
          <div className="flex justify-center  ">
            <div className="w-full gap-5  bg-white  ">
              <div className="w-full rounded-md  m-2">
                <div className="w-full  rounded-t-md flex md:flex justify-start items-center gap-3  md:p-4">
                  <BsPerson className="text-2xl font-bold  text-gray-700 " />
                  <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
                    Traveler
                  </h1>
                </div>
                <hr></hr>

                {/* form contact information */}
                <div className="flex justify-center bg-white shadow-md  ">
                  <div className="w-full gap-5 flex justify-center   md:p-7">
                    <div className="md:w-11/12 w-full">
                      <div className="md:flex w-full md:justify-start md:items-center md:gap-10">
                        <div className="md:w-full">
                          <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            placeholder="John Doe"
                            readOnly={`${firstName} ${lastName}`}
                          />
                        </div>
                      </div>
                      <div className="md:flex w-full md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="md:w-full">
                          <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            placeholder="ex. john"
                            required
                            readOnly={firstName}
                          />
                        </div>
                        <div className="md:w-full">
                          <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            required
                            placeholder="ex. Doe"
                            readOnly={lastName}
                          />
                        </div>
                      </div>
                      <div className="md:flex w-full md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="md:w-full">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            placeholder="ex. johndoe@gmail.com"
                            required
                            readOnly={email}
                          />
                        </div>
                        <div className="md:w-full">
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                            required
                          >
                            Phone
                          </label>
                          <input
                            type="phone"
                            id="phone"
                            placeholder="ex. +62-8888-2222"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none focus:outline-none"
                            readOnly={phone}
                          />
                        </div>
                      </div>
                      <div className="md:flex w-full md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="my-1 w-full">
                          <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-900 bg-gray-50  "
                          >
                            Address
                          </label>
                          <textarea
                            id="address"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-0 focus:border-black "
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly={address}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center  ">
            <div className="w-full gap-5  bg-white  ">
              <div className="w-full rounded-md  m-2">
                <div className=" items-center justify-center flex-row shadow-md  bg-white rounded-sm text-gray-600 tracking-wide antialiased ">
                  <div className="w-full   flex-row md:flex justify-between  px-7  py-5">
                    <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                      Flight
                    </h1>
                  </div>
                  <hr />
                  <div className="p-7 ">
                    <div className="flex justify-between md:flex-row text-sm font-thin my-1">
                      <p>Depart Flight</p>
                      <p>
                        {new Date(data.Flight.departure_time).toDateString()}
                      </p>
                    </div>
                    <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                      <p>Plane</p>
                      <figure className="max-w-md">
                        <Image
                          className="w-10 lg:w-12 flex "
                          src={item.Ticket.photo}
                          alt="logo penerbangan"
                          width={50}
                          height={50}
                        ></Image>
                        <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                          {data.Flight.Plane.name}
                        </figcaption>
                      </figure>
                    </div>
                    <hr />

                    <div className="flex w-full justify-between    gap-2 text-gray-600 tracking-wide my-3 antialiased">
                      <div className="flex  gap-4 items-center">
                        <div>
                          <p className="font-bold text-xl">10 : 30</p>
                          <p className="text-sm">9 Dec 2022</p>
                        </div>
                        <div className=" w-36 lg:w-56">
                          <p className="text-md font-semibold">
                            {data.Flight.from.city} ({" "}
                            {data.Flight.from.city_code} ){" "}
                          </p>
                          <p className="text-sm">{data.Flight.from.name}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div>
                          <p className="font-bold text-xl">11 : 30</p>
                          <p className="text-sm">9 Dec 2022</p>
                        </div>
                        <div className=" w-36 lg:w-56">
                          <p className="text-md font-semibold">
                            {data.Flight.to.city} ( {data.Flight.to.city_code} ){" "}
                          </p>
                          <p className="text-sm">{data.Flight.to.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                      <hr></hr>
                      <div className="flex gap-3 items-center my-1 ">
                        <GiBackpack className="" />
                        <p>Cabin Baggage {data.cabin_baggage}</p>
                      </div>
                      <div className="flex gap-3 items-center my-1">
                        <MdOutlineLuggage className="t" />
                        <p>Baggage {data.baggage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tiket Detail */}
        <div className="w-full  md:w-full lg:w-4/12">
          <div className="w-full md:justify-between ">
            {/* Price Detail */}
            <div className=" items-center justify-between flex-row shadow-md  bg-white rounded-md text-gray-600 tracking-wide antialiased mb-2">
              <div className="w-full   flex-row md:flex justify-between  px-7 py-5">
                <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                  Price Detail
                </h1>
              </div>
              <hr />
              <div className="p-7">
                <div className="font-semibold gap-5 my-2 text-base flex justify-between">
                  <div className="flex items-center gap-2 ">
                    <p>Depart</p>
                    <p>KDI</p>
                    <IoAirplaneOutline />
                    <p>UPG</p>
                  </div>
                  <p>RP {data.price}</p>
                </div>
                <div className="flex justify-between text-sm font-thin my-1">
                  <p>Adult x 1</p>
                  <p>RP 678.000</p>
                </div>
                <div className="flex justify-between text-sm font-thin my-1">
                  <input type="text"></input>
                  <Button></Button>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold tracking-wider my-2">
                  <p>total Price</p>
                  <p>RP 678.000</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <a href="confirm/book">
                <button
                  type="button"
                  className="focus:outline-none lg:w-full mt-2 text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-semibold antialiased tracking-wide rounded-md text-md  px-5 py-2.5 mr-2 mb-2 "
                >
                  Continue Booking
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
