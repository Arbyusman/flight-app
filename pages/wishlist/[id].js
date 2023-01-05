import { NavbarComponent, Footer } from "../../components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDropdown, IoMdArrowRoundForward } from "react-icons/io";
import {
  MdOutlineLuggage,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { HiArrowSmLeft } from "react-icons/hi";
import { FaHeartBroken } from "react-icons/fa";
import { TbPlaneOff } from "react-icons/tb";
import { GiBackpack } from "react-icons/gi";
export default function WishlistUser() {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    setToken(token);
    handelGetwishlist();
    setLoading(false);
  }, [router.isReady]);

  const handelGetwishlist = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/wishlist/user/${id}`, {
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
  };

  const handleDeleteWishlist = async () => {
    setDeleteLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.API_ENDPOINT}api/v1/wishlist/${currentIndex}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();
    if (data.status === "OK") {
      setDeleteLoading(false);
      setOpenModal(false);
      handelGetwishlist();
    } else {
      setDeleteLoading(false);
    }
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
        <div className="justify-center items-center flex-row ">
          {/* title */}
          <div className="flex justify-center items-center">
            <div className="lg:w-9/12 md:w-11/12 w-full flex-row  bg-white rounded-md mt-5 justify-between shadow-md p-7">
              <div className="text-gray-700 flex justify-between items-center">
                <div className="flex-row">
                  <h1 className="font-semibold tracking-wide antialiased text-lg">
                    Wishlist
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
          </div>
          {/* end title */}
          {/* ticket */}

          <Modal show={openModal} size="md" popup={true}>
            <Modal.Body>
              <div className="p-6 text-center">
                <div className="flex justify-center items-center w-full my-2">
                  <TbPlaneOff className="text-5xl text-red-700" />
                </div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure to delete the ticket from wishlist?
                </h3>
                <button
                  onClick={handleDeleteWishlist}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  {!deleteLoading && <span> Yes, I'm sure</span>}
                  {deleteLoading && (
                    <svg
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
                        fill="#1C64F2"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </Modal.Body>
          </Modal>

          {data.length > 0 ? (
            data.map((item) => (
              <div key={item.id}>
                <div className="flex justify-center ">
                  <div className="lg:w-9/12 w-96 md:w-11/12 bg-white rounded-t-md mt-5  shadow-md py-4 px-1  lg:p-3">
                    <div className="flex-row mx-4 md:mx-2 md:flex items-center md:h-12 justify-between  ">
                      <figure className="max-w-xs  flex md:block md:mb-0 gap-2 mb-1">
                        <Image
                          priority
                          className="w-7 lg:w-10 flex  "
                          src={item.Ticket.photo}
                          alt="logo penerbangan"
                          width={100}
                          height={100}
                        />
                        <figcaption className="text-xs  text-gray-500 dark:text-gray-400">
                          {item.Ticket.Flight.Plane.name}
                        </figcaption>
                      </figure>
                      <div className="flex items-center gap-1">
                        <MdOutlineAirlineSeatReclineNormal className="text-green-700 text-lg" />
                        <p>{item.Ticket.type}</p>
                      </div>
                      <div className="flex items-center gap-4 lg:gap-6 my-1  lg:my-0">
                        <p className="">{item.Ticket.Flight.departure_time}</p>
                        <IoMdArrowRoundForward />
                        <p className="">
                          {" : "}
                          {item.Ticket.Flight.arrival_time}
                        </p>
                      </div>

                      <div className="flex gap-1 items-center my-1  lg:my-0">
                        <p>RP/ </p>
                        <p>{item.Ticket.price}</p>
                        <p>/Pax</p>
                      </div>
                      <div className="flex lg:gap-10 md:gap-3 justify-between">
                        <Link
                          href={`/search/book?ticket1=${item.ticket_id}`}
                          type="button"
                          className="focus:outline-none my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-3 py-2 transition"
                        >
                          Choose Flight
                        </Link>

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
                  <div className="lg:w-9/12 w-96 md:w-11/12 bg-white border-t-2   shadow-md p-7 mb-1">
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
                        <div className="lg:mt-2 justify-start flex ">
                          <button
                            onClick={() => setOpenModal(true)}
                            className="focus:outline-none flex  items-center gap-2 1 my-1 lg:my-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2 transition"
                          >
                            <FaHeartBroken className="" />
                            <span> Remove </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center my-5">
              <p className="text-xl font-normal text-gray-900">
                No ticket wishlist
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
