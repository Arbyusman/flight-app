import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

      {data.map((item) => (
        <div key={item.id}>
          <div className="flex justify-center ">
            <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:p-7">
              <div className="flex mx-2 md:flex items-center  justify-between ">
                <p>Ticket ID : {item.Ticket.id}</p>

                <Image
                  className="w-10 hidden sm:flex"
                  src={item.Ticket.photo}
                  alt="logo maskapai"
                  width={50}
                  height={40}
                ></Image>
                <p>
                  {new Date(item.Ticket.Flight.departure_time).toLocaleString(
                    "default",
                    { month: "long" }
                  )}{" "}
                  {new Date(item.Ticket.Flight.departure_time).getFullYear()}
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
            className={`flex justify-center duration-700 ease-in-out overflow-hidden  ${
              isOpen && currentIndex === item.id ? "max-h-auto " : "max-h-0"
            } `}
          >
            <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2   shadow-md p-7">
              <div className=" md:flex items-start  justify-between  ">
                <div className="">
                  <Image
                    className="w-10 lg:w-16 flex "
                    src={item.Ticket.photo}
                    alt="logo penerbangan"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="flex items-start  gap-7 md:gap-10 text-gray-600 tracking-wide antialiased my-2">
                  <div className="flex-row lg:gap-20 gap-7 items-center">
                    <div className="mb-2">
                      <p className="font-bold text-xl">
                        {new Date(item.Ticket.Flight.departure_time).getHours()}
                        {" : "}
                        {new Date(
                          item.Ticket.Flight.departure_time
                        ).getMinutes()}
                      </p>
                      <p>
                        {new Date(
                          item.Ticket.Flight.departure_time
                        ).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-xl">
                        {new Date(item.Ticket.Flight.arrival_time).getHours()}
                        {" : "}
                        {new Date(item.Ticket.Flight.arrival_time).getMinutes()}
                      </p>
                      <p>
                        {new Date(
                          item.Ticket.Flight.arrival_time
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
                      <p className="text-sm">{item.Ticket.Flight.from.name}</p>
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
                <hr className="md:hidden mt-2 mb-1"></hr>
                <div className="gap-7 text-gray-600 tracking-wide antialiased text-sm max-w-xs ">
                  <div className="flex gap-2">
                    <BsPerson className="text-2xl font-bold  text-gray-700 " />
                    <h1 className="text-md font-bold antialiased tracking-wider text-gray-700">
                      Traveler Information
                      <hr></hr>
                    </h1>
                  </div>
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
                      className="block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={item.User.address}
                    ></textarea>
                  </div>
                </div>
              </div>
              <hr />
              <div className=" items-center justify-between flex-row   bg-white  text-gray-600 tracking-wide antialiased mb-2">
                <div className="w-full   flex-row md:flex justify-between  mt-3">
                  <h1 className="text-base font-medium antialiased tracking-wider text-gray-700 ">
                    Price Detail
                  </h1>
                </div>
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
                    <p>Traveler x 1</p>
                    <p>RP {item.Ticket.price}</p>
                  </div>
                  <div className="flex justify-between text-sm font-thin my-1">
                    <p>promo </p>
                    <p>RP {item.Promo.code}</p>
                  </div>
                  <div className="flex justify-between text-sm font-thin my-1"></div>
                  <hr />
                  <div className="flex justify-between text-sm font-bold tracking-wider my-2">
                    <p>Total Price</p>
                    <p>RP 678.000</p>
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
