import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDropdown, IoIosTimer } from "react-icons/io";
import { MdOutlineLuggage } from "react-icons/md";
import { HiArrowSmLeft } from "react-icons/hi";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import logoMaskapai from "../public/images/lion_air.png";

export default function Wishlist() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");

    fetch(`${process.env.API_ENDPOINT}api/v1/wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setData(data.data);
      });
    setLoading(false);
  }, []);

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
              <p className="text-sm">jumlah Wishlist</p>
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

      {data.map((item) => (
        <div key={item.id}>
          <div className="flex justify-center ">
            <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:p-7">
              <div className="flex-row mx-4 md:mx-0 md:flex items-center  justify-between ">
                <p>Ticket ID : {item.ticket_id}</p>
                <p>1 Traveler</p>
                <p>kam, 8 Des 2022</p>

                <div className="flex gap-1 items-center">
                  <p>RP/ </p>
                  <p>678.000</p>
                  <p>/Pax</p>
                </div>
                <div className="flex lg:gap-10 md:gap-3 justify-between">
                  <button
                    type="button"
                    className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-1 "
                  >
                    Choose Flight
                  </button>

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
            <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2   shadow-md p-7">
              <div className=" md:flex items-start  justify-between lg:justify-around ">
                <Image className="w-16 lg:w-24 flex " src={logoMaskapai} />
                <div className=" items-center gap-7 text-gray-600 tracking-wide antialiased my-2">
                  <div className="flex lg:gap-20   gap-7 items-center">
                    <div>
                      <p className="font-bold text-xl">10 : 30</p>
                      <p>9 Dec 2022</p>
                    </div>
                    <div className="w-40  lg:w-auto ">
                      <p className="text-md">Kendari ( KDI )</p>
                      <p className="text-sm">Haluoleo Airport</p>
                    </div>
                  </div>
                  <div className="flex gap-2 my-2 items-center">
                    <IoIosTimer className="" />
                    <p> 1h:0m</p>
                  </div>
                  <div className="flex lg:gap-20 gap-5  items-center">
                    <div>
                      <p className="font-bold text-xl">11 :30</p>
                      <p>9 Dec 2022</p>
                    </div>
                    <div className=" w-40  lg:w-auto ">
                      <p className="text-md">Makassar ( UPG )</p>
                      <p className="text-sm">
                        Sultan Hasanuddin International Airport
                      </p>
                    </div>
                  </div>
                </div>
                <div className="gap-7 text-gray-600 tracking-wide antialiased text-sm ">
                  <div className="flex gap-3 items-center my-1 lg:my-3 ">
                    <GiBackpack className="text-xl text-green-500" />
                    <p>Cabin Baggage 7kg</p>
                  </div>
                  <div className="flex gap-3 items-center my-1 lg:my-3">
                    <MdOutlineLuggage className="text-xl text-blue-500" />
                    <p>Baggage 20kg</p>
                  </div>
                  <div className="flex gap-3 items-center my-1 lg:my-3">
                    <BiJoystick className="text-xl text-red-500" />
                    <p>Entertainment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
