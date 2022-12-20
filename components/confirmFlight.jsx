import React, { useState } from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineLuggage } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import { Button } from "flowbite-react";

export default function ConfirmFlight() {
  return (
    <div className="justify-center items-center flex">
      <div className="lg:flex mt-5 gap-3 w-full md:w-11/12 lg:w-9/12 flex-row ">
        {/* contact information */}

        <div className=" w-full lg:w-8/12 ">
          <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-between shadow-md px-7 py-5">
            <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
              Contact Information
            </h1>
          </div>
          <hr />

          {/* form contact information */}
          <div className="flex justify-center  ">
            <div className="w-full gap-5  bg-white  flex justify-center  items-center shadow-md p-7">
              <div className="w-11/12">
                <div className="md:flex w-full md:justify-center md:items-center md:gap-10">
                  <div className="md:w-40">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                    >
                      Title
                    </label>

                    <select
                      id="title"
                      label="Select"
                      color="gray"
                      className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none"
                      required
                    >
                      <option disabled hidden>
                        Select
                      </option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </select>
                  </div>
                  <div className="md:w-full">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                      required
                      placeholder="ex. Joh Doe"
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
                      required
                      placeholder="ex. johndoe@gmail.com"
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
                      className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none focus:outline-none"
                      placeholder="ex. +622-8888-2222"
                    />
                  </div>
                </div>
                <div className="md:flex w-full md:justify-start md:mt-2 md:items-center">
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
                      placeholder="ex. kendari"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Information */}
          <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-between shadow-md p-7">
            <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
              Traveler Information
            </h1>
          </div>
          <hr />
          <div className="flex justify-center  ">
            <div className="w-full gap-5  bg-white    shadow-md p-7">
              {/* card traveler */}
              <div className="w-full rounded-md md:shadow-lg bg-slate-50 m-2">
                <div className="w-full  bg-white rounded-t-md flex md:flex justify-start items-center gap-3 md:shadow-md md:p-7">
                  <BsPerson className="text-2xl font-bold  text-gray-700 " />
                  <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
                    Traveler 1
                  </h1>
                </div>

                {/* form contact information */}
                <div className="flex justify-center  ">
                  <div className="w-full gap-5  bg-white border-t-2 flex justify-center  md:shadow-md md:p-7">
                    <div className="md:w-11/12 w-full">
                      <div className="md:flex w-full md:justify-start md:items-center md:gap-10">
                        <div className="md:w-40">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            Title
                          </label>

                          <select
                            id="title"
                            label="Select"
                            color="gray"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none"
                            required
                          >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                          </select>
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
                          />
                        </div>
                      </div>
                      <div className="md:flex w-full md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="md:w-[47%]">
                          <label
                            htmlFor="id_card"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                            required
                          >
                            ID Card
                          </label>
                          <input
                            type="text"
                            id="id_card"
                            placeholder="ex. 74012222000022"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none focus:outline-none"
                          />
                        </div>
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
            <div className=" items-center justify-between flex-row shadow-md  bg-white rounded-sm text-gray-600 tracking-wide antialiased mb-2">
              <div className="w-full   flex-row md:flex justify-between  px-7  py-5">
                <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                  Flight
                </h1>
              </div>
              <hr />
              <div className="p-7">
                <div className="flex justify-between md:flex-row text-sm font-thin my-1">
                  <p>Depart Flight</p>
                  <p>Sat, 17 December 2022</p>
                </div>
                <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                  <p>Lion Air</p>
                  <p>JT991</p>
                </div>
                <hr />
                <div className="flex justify-center lg:block  items-center gap-2 text-gray-600 tracking-wide my-3 antialiased">
                  <div className="flex  gap-4 items-center">
                    <div>
                      <p className="font-bold text-xl">10 : 30</p>
                      <p className="text-sm">9 Dec 2022</p>
                    </div>
                    <div className="w-36 lg:w-52 ">
                      <p className="text-md font-semibold">Kendari ( KDI )</p>
                      <p className="text-sm">Haluoleo Airport</p>
                    </div>
                  </div>
                  <div className="flex gap-2 my-2 items-center">
                    <IoIosTimer />
                    <p> 1h:0m</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <p className="font-bold text-xl">11 : 30</p>
                      <p className="text-sm">9 Dec 2022</p>
                    </div>
                    <div className=" w-36 lg:w-52">
                      <p className="text-md font-semibold">Makassar ( UPG ) </p>
                      <p className="text-sm">
                        Sultan Hasanuddin International Airport
                      </p>
                    </div>
                  </div>
                </div>
                <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                  <hr></hr>
                  <div className="flex gap-3 items-center my-1 ">
                    <GiBackpack className="" />
                    <p>Cabin Baggage 7kg</p>
                  </div>
                  <div className="flex gap-3 items-center my-1">
                    <MdOutlineLuggage className="t" />
                    <p>Baggage 20kg</p>
                  </div>
                  <div className="flex gap-3 items-center my-1">
                    <BiJoystick className="" />
                    <p>Entertainment</p>
                  </div>
                </div>
              </div>
            </div>

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
                  <p>RP 678.000</p>
                </div>
                <div className="flex justify-between text-sm font-thin my-1">
                  <p>Adult x 1</p>
                  <p>RP 678.000</p>
                </div>
                <div className="flex justify-between text-sm font-thin my-1">
                  <input></input>
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
