import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdArrowRoundForward, IoIosTimer } from "react-icons/io";
import { IoAirplaneOutline } from "react-icons/io5";

import { MdOutlineLuggage } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { GiBackpack } from "react-icons/gi";
import Image from "next/image";
import logoImage from "../../../public/images/TakeOff.png";
import { TbPlane } from "react-icons/tb";
import { Button } from "flowbite-react";

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;

  const [token, setToken] = useState("");
  const [data, setData] = useState();

  const [userId, setUserId] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    data;
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");

    setToken(token);
    whoami();
    handelGetTransaction();
  }, [router.isReady]);

  const handelGetTransaction = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/transaction/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setData(data.data);
        console.log(data.data);
      });
  };

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
        setUserId(data.data.id);
      });
  };

  const handelPrint = () => {
    window.print();
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
        {data && (
          <div class="mx-auto w-full md:w-4/12 bg-gray-100 shadow-lg px-10 mt-20">
            <div class="flex items-center justify-between ">
              <div>
                <span class="text-2xl">Invoice #</span>: {id}
                <br />
                <span>Date</span>: {new Date(data.createdAt).toDateString()}
                <br />
              </div>
              <div class="text-right">
                <Image
                  src={logoImage}
                  width={100}
                  height={100}
                  alt="logo take off"
                />
              </div>
            </div>
            <div className="border-b-2 mb-5"></div>

            <div className="gap-7 mt-2 w-full text-gray-600 tracking-wide antialiased text-sm mb-2 md:mb-0 ">
              <div className="flex gap-2">
                <BsPerson className="text-2xl font-bold  text-gray-700 " />
                <h1 className="text-md mb-2 font-bold antialiased tracking-wider text-gray-700">
                  Traveler
                </h1>
              </div>
              <hr></hr>

              <div className="flex  gap-3 items-center my-1 lg:my-3">
                <p>Name :</p>
                <p>
                  {data.User.firstName} {data.User.lastName}
                </p>
              </div>
              <div className="flex  gap-3 items-center my-1 lg:my-3">
                <p>Email :</p>
                <p>{data.User.email}</p>
              </div>
              <div className="flex gap-3 items-center my-1 lg:my-3">
                <p>Phone :</p>
                <p>{data.User.phone}</p>
              </div>
              <div className="flex items-start gap-3  my-1 lg:my-3">
                <p>Address:</p>
                <p rows="4" className="flex  ">
                  {data.User.address}
                </p>
              </div>
            </div>
            <div className="gap-7 mt-5 w-full text-gray-600 tracking-wide antialiased text-sm mb-2 md:mb-0 ">
              <div className="w-full   flex-row md:flex justify-between ">
                <h1 className="text-md mb-2 font-bold antialiased tracking-wider text-gray-700">
                  Ticket Detail
                </h1>
              </div>
              <hr></hr>
              <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                <p>Plane</p>
                <figure className="max-w-md ">
                  <Image
                    className="w-7 flex "
                    src={data.Ticket.photo}
                    alt="logo penerbangan"
                    width={50}
                    height={50}
                  ></Image>
                  <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                    {data.Ticket.Flight.Plane.name}
                  </figcaption>
                </figure>
              </div>

              <div className=" flex col-span-3 w-full justify-between  gap-2 text-gray-600 tracking-wide my-3 antialiased">
                <div className="text-sm md:text-md  w-56 font-semibold ">
                  <p>
                    {data.Ticket.Flight.from.city} ({" "}
                    {data.Ticket.Flight.from.city_code} ){" "}
                  </p>
                  <p className="">{data.Ticket.Flight.departure_time}</p>
                  <p className="text-xs">
                    {new Date(data.Ticket.Flight.departure_date).toDateString()}
                  </p>
                </div>
                <TbPlane className="text-2xl  text-green-700" />
                <div className="text-sm md:text-md text-end  w-56 font-semibold ">
                  <p>
                    {data.Ticket.Flight.to.city} ({" "}
                    {data.Ticket.Flight.to.city_code} ){" "}
                  </p>
                  <p className="">{data.Ticket.Flight.arrival_time}</p>
                  <p className="text-xs">
                    {new Date(data.Ticket.Flight.arrival_date).toDateString()}
                  </p>
                </div>
              </div>
              <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                <div className="flex gap-3 items-center my-1 lg:my-3 ">
                  <GiBackpack className="text-xl text-green-500" />
                  <p>Cabin Baggage {data.Ticket.cabin_baggage}</p>
                </div>
                <div className="flex gap-3 items-center my-1 lg:my-3">
                  <MdOutlineLuggage className="text-xl text-blue-500" />
                  <p>Baggage {data.Ticket.baggage}</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-2 items-center justify-between flex-row    text-gray-600 tracking-wide antialiased mb-2">
              <div className="w-full   flex-row md:flex justify-between ">
                <h1 className="text-md font-bold antialiased tracking-wider text-gray-700">
                  Price Detail
                </h1>
              </div>
              <hr></hr>
              <div className="">
                <div className="font-thin gap-5 my-2 text-sm flex justify-between">
                  <div className="flex items-center gap-2 ">
                    <p>Depart</p>
                    <p>{data.Ticket.Flight.from.city}</p>
                    <TbPlane className="text-green-500 text-xl" />
                    <p>{data.Ticket.Flight.to.city}</p>
                  </div>
                  <p>RP {data.Ticket.price} </p>
                </div>

                <div className="flex justify-between text-sm font-thin my-1"></div>
                <hr />
                <div className="flex justify-between text-sm font-bold tracking-wider my-2 py-5">
                  <p>Total Price</p>
                  <p>RP {data.Ticket.price}</p>
                </div>
              </div>
              <div className="flex justify-center gap-10">
                <Link
                  href={`/history/${userId}`}
                  className="flex justify-between bg-green-500 hover:bg-green-700 hover:text-gray-100 text-sm font-bold tracking-wider my-2 py-2 px-5 rounded-md text-center items-center text-white mb-5"
                >
                  <p>Back </p>
                </Link>
                <Button
                  onClick={handelPrint}
                  className="flex justify-between bg-blue-500 hover:bg-blue-700 hover:text-gray-100 text-sm font-bold tracking-wider my-2 py-2 mb-5"
                >
                  <p>Print</p>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
