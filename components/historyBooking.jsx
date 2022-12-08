import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import { IoIosArrowDropdown } from "react-icons/io";

import { GrUserManager } from "react-icons/gr";
import Image from "next/image";
import logoMaskapai from "../public/images/lion_air.png";

export default function HistoryBooking() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="justify-center items-center flex-row">
      {/* title */}
      <div className="flex justify-center items-center">
        <div className="md:w-2/3 flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
          <div className="text-gray-700">
            <h1 className="font-semibold tracking-wide antialiased text-lg">
              History Penerbangan Anda
            </h1>
            <p className="text-sm">kam, 8 Des 2022</p>
          </div>
          <div className="gap-2 flex items-center justify-center ">
            <Dropdown
              id="filter_tiket"
              label="Filter"
              color="gray"
              className="py-2.5 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 "
            >
              <Dropdown.Item>Terbaru</Dropdown.Item>
              <Dropdown.Item>Terlama</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* end title */}
      {/* Hstory booking */}
      <div>
        <div className="flex justify-center ">
          <div className="md:w-2/3  bg-white rounded-t-md mt-5 shadow-md p-7">
            <div className="flex items-center text-sm justify-between ">
              <p>Ticket ID : 112233</p>
              <p>1 Traveler</p>
              <p>kam, 8 Des 2022</p>

              <div className="flex gap-1 items-center">
                <p>RP/ </p>
                <p>678.000</p>
                <p>/Pax</p>
              </div>

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
            <div className="flex items-start  justify-center gap-12 ">
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

              <div className="gap-7 text-gray-600 ">
                <div className="text-md flex items-center gap-2">
                  {" "}
                  <GrUserManager className="text-lg " />
                  <p>Traveler : 1</p>
                </div>
                <div className="flex gap-7">
                  <div className="text-sm ">
                    <p>Name </p>
                    <p>Address</p>
                  </div>

                  <div className="text-sm max-w-sm">
                    <p>: John Doe</p>
                    <p className="text-justify leading-normal">
                      : sulawesi tenggara,kota kendari,kecematan kambu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
