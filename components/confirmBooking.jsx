import React, { useState } from "react";
import { IoMdArrowRoundForward, IoIosTimer } from "react-icons/io";
import { IoAirplaneOutline } from "react-icons/io5";

import { MdOutlineLuggage } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import Image from "next/image";
import logoMaskapai from "../public/images/lion_air.png";

export default function ConfirmBooking() {
  return (
    <div className="justify-center items-center flex">
      {/* ticket */}
      <div className="lg:flex mt-5 gap-3 w-full md:w-11/12 lg:w-2/3 flex-row ">
        <div className=" w-full ">
          <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-between shadow-md p-7">
            <div className=" items-center text-gray-600  text-md justify-between ">
              <div className="flex items-center gap-2">
                <p>Kendari (KDI)</p>
                <IoMdArrowRoundForward />
                <p>Makassar (UPG)</p>
              </div>
              <hr></hr>
              <div className="flex gap-2 text-sm">
                <p>kam, 8 Des 2022</p>
                <p>|</p>
                <p>1 Traveler</p>
              </div>
            </div>

            <button
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 md:px-5 py-1 md:py-2.5 text-center md:mr-2 mb-2 mt-2 lg:mt-0"
            >
              Change Flight
            </button>
          </div>

          {/* ticket desc */}
          <div className="flex justify-center duration-700 ease-in-out ">
            <div className="w-full  bg-white border-t-2   shadow-md p-7">
              <div className="flex-row md:flex items-start gap-8 md:gap-5 lg:gap-8  justify-between ">
                <Image className="w-20 flex-row mb-2 md:mb-0 md:flex" src={logoMaskapai} />
                <div className=" items-center gap-2 text-gray-600 tracking-wide antialiased">
                  <div className="flex gap-4 items-center">
                    <div>
                      <p className="font-bold text-xl">10 : 30</p>
                      <p className="text-sm">9 Dec 2022</p>
                    </div>
                    <div className="w-36 lg:w-auto ">
                      <p className="text-md font-semibold">Kendari ( KDI )</p>
                      <p className="text-sm">Haluoleo Airport</p>
                    </div>
                  </div>
                  <div className="flex gap-2 my-2 items-center">
                    <IoIosTimer className="" />
                    <p> 1h:0m</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <p className="font-bold text-xl">11 : 30</p>
                      <p className="text-sm">9 Dec 2022</p>
                    </div>
                    <div className=" w-36 lg:w-auto">
                      <p className="text-md font-semibold">Makassar ( UPG ) </p>
                      <p className="text-sm">
                        Sultan Hasanuddin International Airport
                      </p>
                    </div>
                  </div>
                </div>
                <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm ">
                  <div className="flex gap-3 items-center my-1 ">
                    <GiBackpack className="text-xl text-green-500" />
                    <p>Cabin Baggage 7kg</p>
                  </div>
                  <div className="flex gap-3 items-center my-1">
                    <MdOutlineLuggage className="text-xl text-blue-500" />
                    <p>Baggage 20kg</p>
                  </div>
                  <div className="flex gap-3 items-center my-1">
                    <BiJoystick className="text-xl text-red-500" />
                    <p>Entertainment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* Price Detail */}
        <div className="w-full lg:w-1/3 md:w-full">
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
            <button
              type="button"
              class="focus:outline-none lg:w-full mt-2 text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-semibold antialiased tracking-wide rounded-md text-md  px-5 py-2.5 mr-2 mb-2 "
            >
              Continue Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}