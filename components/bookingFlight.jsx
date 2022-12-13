import React, { useState } from "react";
import { IoMdArrowRoundForward, IoIosTimer } from "react-icons/io";
import { IoAirplaneOutline } from "react-icons/io5";

import { MdOutlineLuggage } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import Image from "next/image";
import logoMaskapai from "../public/images/lion_air.png";

export default function BookingFlight() {
  return (
    <div className="justify-center items-center flex">
      <div className="lg:flex mt-5 gap-3 w-full md:w-11/12 llg:w-9/12 flex-row ">
      {/* contact information */}

        <div className=" w-full lg:w-8/12 ">
          <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-between shadow-md p-7">
            <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
              Contact Information
            </h1>
          </div>

          {/* form contact information */}
          <div className="flex justify-center duration-700 ease-in-out ">
            <div className="w-full gap-5 lg:grid lg:grid-cols-2  bg-white border-t-2   shadow-md p-7">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2 bg-gray-50 text-base  focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                />
              </div>
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2 bg-gray-50 text-base  focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                />
              </div>
            </div>
          </div>
          
        </div>
        {/* Price Detail */}
        <div className="w-full  md:w-full lg:w-4/12">
          <div className="w-full md:justify-between ">
            <div className=" items-center justify-between flex-row shadow-md p-7 bg-white rounded-md text-gray-600 tracking-wide antialiased">
              <h1 className="font-semibold tracking-wider mb-5 text-lg">
                Price Detail
              </h1>
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
              <hr className="border-2"></hr>
              <div className="flex justify-between text-lg font-bold tracking-wider my-2">
                <p>total Price</p>
                <p>RP 678.000</p>
              </div>
            </div>
            <a href="confirm/book">
              <button
                type="button"
                class="focus:outline-none lg:w-full mt-2 text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-semibold antialiased tracking-wide rounded-md text-md  px-5 py-2.5 mr-2 mb-2 "
              >
                Continue Booking
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
