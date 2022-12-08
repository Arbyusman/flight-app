import React, { useState } from "react";
import { Button, Dropdown, Select } from "flowbite-react";
import {
  IoMdArrowRoundForward,
  IoIosArrowDropdown,
  IoIosTimer,
} from "react-icons/io";

import { MdOutlineLuggage } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import Image from "next/image";
import logoMaskapai from "../public/images/lion_air.png";

export default function ConfirmBooking() {
  return (
    <div className="justify-center items-center flex">
      {/* ticket */}
      <div className="w-full">
        <div className="flex justify-center ">
          <div className="md:w-2/3  bg-white rounded-t-md mt-5 flex justify-between shadow-md p-7">
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
              className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 "
            >
              Change Flight
            </button>
          </div>
        </div>

        {/* ticket desc */}
        <div className="flex justify-center duration-700 ease-in-out ">
          <div className="md:w-2/3  bg-white border-t-2   shadow-md p-7">
            <div className="flex items-start  justify-between ">
              <Image className="w-16 flex" src={logoMaskapai} />
              <div className=" items-center gap-7 text-gray-600 tracking-wide antialiased">
                <div className="flex gap-7 items-center">
                  <div>
                    <p className="font-bold text-xl">10 : 30</p>
                    <p>9 Dec 2022</p>
                  </div>
                  <div className=" ">
                    <p className="text-md">Kendari ( KDI )</p>
                    <p className="text-sm">Haluoleo Airport</p>
                  </div>
                </div>
                <div className="flex gap-2 my-2 items-center">
                  <IoIosTimer className="" />
                  <p> 1h:0m</p>
                </div>
                <div className="flex gap-7 items-center">
                  <div>
                    <p className="font-bold text-xl">11 :30</p>
                    <p>9 Dec 2022</p>
                  </div>
                  <div className=" ">
                    <p className="text-md">Makassar ( UPG )</p>
                    <p className="text-sm">
                      Sultan Hasanuddin International Airport
                    </p>
                  </div>
                </div>
              </div>
              <div className="gap-7  text-gray-600 tracking-wide antialiased text-sm ">
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
    </div>
  );
}
