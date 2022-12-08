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

export default function SearcResult() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="justify-center items-center flex-row">
      {/* title */}
      <div className="flex justify-center items-center">
        <div className="md:w-2/3 flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
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
          <div className="gap-2 flex items-center justify-center ">
            <Dropdown
              id="filter_tiket"
              label="Filter"
              color="gray"
              className="py-2.5 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 "
            >
              <Dropdown.Item>Harga Terendah</Dropdown.Item>
              <Dropdown.Item>Harga Tertinggi</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* end title */}
      {/* ticket */}
      <div>
        <div className="flex justify-center ">
          <div className="md:w-2/3  bg-white rounded-t-md mt-5 shadow-md p-7">
            <div className="flex items-center  justify-between ">
              <Image className="w-16 flex" src={logoMaskapai} />
              <div className="flex items-center gap-7">
                <p>9 :30</p>
                <IoMdArrowRoundForward />
                <p>11 :30</p>
              </div>
              <p className="flex">2h 0m</p>
              <p className="flex gap-1 items-center">
                <MdOutlineLuggage />
                20 KG
              </p>
              <div className="flex gap-1 items-center">
                <p>RP/ </p>
                <p>678.000</p>
                <p>/Pax</p>
              </div>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 "
              >
                Choose Flight
              </button>

              <button
                type="button"
                className={`text-gray-400 rounded-full  hover:shadow-2xl hover:bg-gray-100 hover:text-gray-500   ${
                  isOpen ? "rotate-180 duration-700 " : "rotate-0 duration-700"
                } `}
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoIosArrowDropdown
                  className="w-full"
                  style={{ width: "25px", height: "25px" }}
                />
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>

        {/* ticket desc */}
        <div
          className={`flex justify-center duration-700 ease-in-out overflow-hidden  ${
            isOpen ? "max-h-56" : "max-h-0"
          } `}
        >
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
