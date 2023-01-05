import { NavbarComponent, Footer } from "../../components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
import {
  MdOutlineLuggage,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { GiBackpack } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import { HiArrowSmLeft } from "react-icons/hi";
import Image from "next/image";

export default function History() {
  const router = useRouter();
  const { id } = router.query;

  const [token, setToken] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    getTransaction();
    setToken(token);
  }, [router.isReady]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [data, setData] = useState([]);

  const getTransaction = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/transaction/history/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setData(data.data);
      });
  };

  if (!token) {
    return (
      <section className="h-screen">
        <div className="w-full  h-full flex justify-center items-center">
          <svg
            className="flex  justify-center items-center mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </section>
    );
  } else {
    return (
      <div>
        <NavbarComponent />
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
                className="flex text-gray-600 hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 text-center gap-1 transition"
              >
                <HiArrowSmLeft className="text-xl" />
                <span>Back</span>
              </Link>
            </div>
          </div>
          {/* end title */}
          {/* ticket */}

          {data.length > 0 ? (
            (data.sort((a, b) => b.id - a.id),
            data.map((item) => (
              <div key={item.id}>
                <div className="flex justify-center ">
                  <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:p-3">
                    <div className="flex mx-2 md:flex items-center md:h-10 justify-between ">
                      <p className="hidden md:flex">
                        Transaction ID : {item.id}
                      </p>
                      <div className="flex items-center gap-1">
                        <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                        <p>{item.Ticket.type}</p>
                      </div>
                      <p>
                        {new Date(
                          item.Ticket.Flight.departure_date
                        ).toLocaleString("default", { month: "long" })}{" "}
                        {new Date(
                          item.Ticket.Flight.departure_date
                        ).getFullYear()}
                      </p>

                      <div className=" gap-1 items-center hidden sm:flex">
                        <p>RP/ </p>
                        <p>{item.Ticket.price}</p>
                        <p>/Pax</p>
                      </div>
                      <Link
                        href={`invoice/${item.id}`}
                        className="focus:outline-none my-1 lg:my-0 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 transition"
                      >
                        <span>Invoice</span>
                      </Link>
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
                  className={`flex justify-center duration-700 ease-in-out overflow-hidden ${
                    isOpen && currentIndex === item.id
                      ? "max-h-auto "
                      : "max-h-0"
                  } `}
                >
                  <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2  border-b-gray-300 border  shadow-md p-7">
                    <div className=" md:flex items-start  justify-between  ">
                      <figure className="max-w-md">
                        <Image
                          priority
                          className="w-10 lg:w-16 flex "
                          src={item.Ticket.photo}
                          alt="logo penerbangan"
                          width={50}
                          height={50}
                        />
                        <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                          {item.Ticket.Flight.Plane.name}
                        </figcaption>
                      </figure>

                      <div className="flex items-start  justify-between gap-7 md:gap-20 lg:gap-32 text-gray-600 tracking-wide antialiased my-2">
                        <div className="flex-row lg:gap-20 gap-7 items-center">
                          <div className="mb-2">
                            <p className="font-bold text-xl">
                              {item.Ticket.Flight.departure_time}
                            </p>
                            <p>
                              {new Date(
                                item.Ticket.Flight.departure_date
                              ).toDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-xl">
                              {item.Ticket.Flight.arrival_time}
                            </p>
                            <p>
                              {new Date(
                                item.Ticket.Flight.arrival_date
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
                            <p className="text-sm">
                              {item.Ticket.Flight.from.name}
                            </p>
                          </div>
                          <div className=" ">
                            <p className="text-md">
                              {item.Ticket.Flight.to.city}(
                              {item.Ticket.Flight.to.city_code})
                            </p>
                            <p className="text-sm">
                              {item.Ticket.Flight.to.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="gap-7 text-gray-600 tracking-wide antialiased text-sm ">
                        <div className="flex gap-3 items-center my-1 lg:my-3 ">
                          <GiBackpack className="text-xl text-green-500" />
                          <p>Cabin Baggage {item.Ticket.cabin_baggage} KG</p>
                        </div>
                        <div className="flex gap-3 items-center my-1 lg:my-3">
                          <MdOutlineLuggage className="text-xl text-blue-500" />
                          <p>Baggage {item.Ticket.baggage} KG</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )))
          ) : (
            <div className="flex justify-center items-center my-5">
              <p className="text-xl font-normal text-gray-900">
                No flight history
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
