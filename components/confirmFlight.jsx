import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal, Alert } from "flowbite-react";
import Image from "next/image";
import { IoAirplaneOutline } from "react-icons/io5";
import { TbPlane } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { MdOutlineLuggage } from "react-icons/md";
import { GiBackpack } from "react-icons/gi";

export default function ConfirmFlight() {
  const router = useRouter();

  const { ticket1, ticket2 } = router.query;

  const [oneWayTicket, setOneWayTicket] = useState([]);
  const [roundTicket, setRoundTicket] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalAlert, setOpenModalAlert] = useState(false);

  const [totalPrice, setTotalPrice] = useState("");

  const [user, setUser] = useState([]);

  const [bookLoading, setBookLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (!ticket1 && !ticket2) router.push("/");
      console.log("data 1", ticket1);
      console.log("data 2", ticket2);
      console.log("ticket 1", oneWayTicket);
      console.log("ticket 2", roundTicket);
      handleGetTicket();
      whoami();
    }
  }, [router.isReady]);

  const handleGetTicket = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const oneWayTicket = data.data.filter((item) => item.id == ticket1);
        const roundWayTicket = data.data.filter((item) => item.id == ticket2);

        setOneWayTicket(oneWayTicket);
        setRoundTicket(roundWayTicket);
        console.log("one way ticket", oneWayTicket);
        console.log("round way ticket", roundWayTicket);
      });
    totalPriceTicket();
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
        setUser(data.data);
        console.log("data user", data, data);
      });
  };

  const totalPriceTicket = () => {
    let oneWayPrice = oneWayTicket[0].price;
    let roundWayPrice = roundTicket[0].price;

    let total = oneWayPrice + roundWayPrice;

    setTotalPrice(total);
  };

  function openModalBooking() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("you are not logged in");
      router.push("/login");
    } else {
      setOpenModal(true);
    }
  }

  async function handelUpdateUsers() {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.API_ENDPOINT}api/v1/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          address,
        }),
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();
    console.log("data update", data);
    whoami();
  }

  async function handelBooking() {
    const ticket_id = ticket1;
    const user_id = user.id;
    const total = oneWayTicket.price;
    const promo_id = 1;
    const body = { user_id, ticket_id, total, promo_id };

    whoami();
    setBookLoading(true);
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    const response = await fetch(
      `${process.env.API_ENDPOINT}api/v1/transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        body: JSON.stringify(body),
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();

    if (data.status === "OK") {
      const ticket_id = ticket2;
      const user_id = user.id;
      const total = roundTicket.price;
      const promo_id = 1;
      const body = { user_id, ticket_id, total, promo_id };

      const response = await fetch(
        `${process.env.API_ENDPOINT}api/v1/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          body: JSON.stringify(body),
        }
      ).catch((err) => {
        throw err;
      });

      const data = await response.json();

      setBookLoading(false);
      setOpenModal(false);
      router.push(`/history/${user.id}`);
    }
  }

  return (
    <div className="justify-center items-center flex">
      <div className="lg:flex mt-5 gap-3 w-full md:w-11/12 lg:w-9/12 flex-row ">
        <div className=" w-full lg:w-8/12 ">
          {/* Traveler Information */}
          <div className="flex justify-center  ">
            <div className="w-full gap-5  ">
              <div className="w-full  bg-white rounded-md pt-2 ">
                <div className="w-full ml-4 mb-2 md:ml-0 md:mb-0  rounded-t-md flex md:flex justify-start items-center gap-3  md:p-4">
                  <BsPerson className="text-2xl font-bold  text-gray-700 " />
                  <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
                    Traveler
                  </h1>
                </div>
                <hr></hr>

                {/* form contact information */}
                <div className="flex justify-center bg-white shadow-md  ">
                  <div className="w-full gap-5 flex justify-center   md:p-7">
                    <div className="md:w-11/12 w-full mx-4 ">
                      <div className="md:flex w-full  md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="md:w-full w">
                          <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            value={user.firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                            placeholder="ex. john"
                          />
                        </div>
                        <div className="md:w-full">
                          <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            required
                            placeholder="ex. Doe"
                            value={user.lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="md:flex w-full md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="md:w-full">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                            placeholder="ex. johndoe@gmail.com"
                            required
                            value={user.email}
                            disabled
                          />
                        </div>
                        <div className="md:w-full">
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          >
                            Phone
                          </label>
                          <input
                            type="phone"
                            id="phone"
                            placeholder="ex. +62-8888-2222"
                            className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none focus:outline-none"
                            value={user.phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="md:flex w-full md:justify-start md:gap-10 md:mt-2 md:items-center">
                        <div className="my-1 w-full">
                          <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Address
                          </label>
                          <textarea
                            id="address"
                            rows="4"
                            placeholder="Kendari sulawesi tenggara"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-0 focus:border-black "
                            value={user.address}
                            onChange={(e) => setAddress(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      {/* <div className="justify-center flex mt-2">
                        <button
                          type="submit"
                          onClick={handelUpdateUsers}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        >
                          save
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={openModalAlert}
            size="sm"
            popup={true}
            position={"top-center"}
          >
            <Alert color="failure" className="justify-center items-center">
              <span className="font-medium">you are not logged in</span>
            </Alert>
          </Modal>
          <Modal
            show={openModal}
            size="xl"
            popup={true}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header className="">
              <h1 className="text-lg px-5 py-1 font-bold antialiased tracking-wider text-gray-700 ">
                Detail
              </h1>
            </Modal.Header>
            <Modal.Body>
              <div className=" justify-center flex-row  items-center  bg-white px-2 text-gray-600 tracking-wide antialiased  rounded-md">
                <hr />
                <div className="justify-center items-center">
                  {!oneWayTicket && <span> </span>}
                  {oneWayTicket.length > 0 ? (
                    oneWayTicket.map((item) => (
                      <div key={item.id} className="p-1 ">
                        <div className="flex justify-between md:flex-row text-sm font-thin my-1">
                          <p>Departure Flight</p>
                          {item.Flight.departure_time}
                        </div>
                        <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                          <p>Plane</p>
                          <figure className="max-w-md ">
                            <Image
                              className="w-7 flex "
                              src={item.photo}
                              alt="logo penerbangan"
                              width={50}
                              height={50}
                            ></Image>
                            <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                              {item.Flight.Plane.name}
                            </figcaption>
                          </figure>
                        </div>

                        <div className=" flex w-full justify-between  gap-2 text-gray-600 tracking-wide my-3 antialiased">
                          <p className="text-sm md:text-md font-semibold">
                            {item.Flight.from.city} ({" "}
                            {item.Flight.from.city_code} ){" "}
                          </p>
                          <TbPlane className="text-2xl  text-green-700" />
                          <p className="text-sm md:text-md font-semibold">
                            {item.Flight.to.city} ( {item.Flight.to.city_code} ){" "}
                          </p>
                        </div>

                        <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                          <div className="flex gap-3 items-center my-1 lg:my-3 ">
                            <GiBackpack className="text-xl text-green-500" />
                            <p>Cabin Baggage {item.cabin_baggage}</p>
                          </div>
                          <div className="flex gap-3 items-center my-1 lg:my-3">
                            <MdOutlineLuggage className="text-xl text-blue-500" />
                            <p>Baggage {item.baggage}</p>
                          </div>
                        </div>
                        <div className="font-normal gap-5 my-2 text-sm md:text-base flex justify-between">
                          <div className="flex items-center gap-2 ">
                            <p>Depart</p>
                            <p>{item.Flight.from.city_code}</p>
                            <IoAirplaneOutline />
                            <p>{item.Flight.to.city_code}</p>
                          </div>
                          <p>RP {item.price}</p>
                        </div>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="justify-center items-center">
                  {!roundTicket && <span> </span>}
                  {roundTicket.length > 0 ? (
                    roundTicket.map((item) => (
                      <div className="p-1 ">
                        <div className="flex justify-between md:flex-row text-sm font-thin my-1">
                          <p>Return Flight</p>
                          {item.Flight.departure_time}
                        </div>
                        <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                          <p>Plane</p>
                          <figure className="max-w-md ">
                            <Image
                              className="w-7 flex "
                              src={item.photo}
                              alt="logo penerbangan"
                              width={50}
                              height={50}
                            ></Image>
                            <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                              {item.Flight.Plane.name}
                            </figcaption>
                          </figure>
                        </div>

                        <div className=" flex w-full justify-between  gap-2 text-gray-600 tracking-wide my-3 antialiased">
                          <div className="flex w-40">
                            <p className="text-sm md:text-md font-semibold ">
                              {item.Flight.from.city} ({" "}
                              {item.Flight.from.city_code} ){" "}
                            </p>
                          </div>
                          <TbPlane className="text-2xl  text-green-700" />
                          <p className="text-sm md:text-md font-semibold ">
                            {item.Flight.to.city} ( {item.Flight.to.city_code} ){" "}
                          </p>
                        </div>

                        <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                          <div className="flex gap-3 items-center my-1 lg:my-3 ">
                            <GiBackpack className="text-xl text-green-500" />
                            <p>Cabin Baggage {item.cabin_baggage}</p>
                          </div>
                          <div className="flex gap-3 items-center my-1 lg:my-3">
                            <MdOutlineLuggage className="text-xl text-blue-500" />
                            <p>Baggage {item.baggage}</p>
                          </div>
                        </div>
                        <div className="font-normal gap-5 my-2 text-sm md:text-base flex justify-between">
                          <div className="flex items-center gap-2 ">
                            <p>Depart</p>
                            <p>{item.Flight.from.city_code}</p>
                            <IoAirplaneOutline />
                            <p>{item.Flight.to.city_code}</p>
                          </div>
                          <p>RP {item.price}</p>
                        </div>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="justify-center items-center flex">
                  <button
                    onClick={handelBooking}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 px-2 py-2 rounded-md font-medium antialiased tracking-wide mt-3"
                  >
                    {!bookLoading && <span>Confirm booking</span>}
                    {bookLoading && (
                      <span>
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
                        Confirm booking
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <div className="flex justify-center mt-4 ">
            <div className="w-full gap-5  bg-white  ">
              <div className="w-full rounded-md ">
                <div className=" items-center justify-center flex-row shadow-md  bg-white rounded-sm text-gray-600 tracking-wide antialiased ">
                  <div className="w-full   flex-row md:flex justify-between  px-7  py-5">
                    <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                      Depart Flight
                    </h1>
                  </div>
                  <hr />
                  {!oneWayTicket && <span> </span>}
                  {oneWayTicket.length > 0 ? (
                    oneWayTicket.map((item) => (
                      <div className="p-7 ">
                        <div className="flex justify-between md:flex-row text-sm font-thin my-1">
                          <p>Depart Flight</p>
                          {item.Flight.departure_date}{" "}
                          {item.Flight.departure_time}{" "}
                        </div>
                        <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                          <p>Plane</p>
                          <figure className="max-w-md">
                            <Image
                              className="w-10 lg:w-12 flex "
                              src={item.photo}
                              alt="logo penerbangan"
                              width={50}
                              height={50}
                            ></Image>
                            <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                              {item.Flight.Plane.name}
                            </figcaption>
                          </figure>
                        </div>
                        <hr />

                        <div className="md:flex w-full justify-between    gap-2 text-gray-600 tracking-wide my-3 antialiased">
                          <div className="flex  gap-4 items-center">
                            <div>
                              <p className="font-bold text-xl">
                                {item.Flight.departure_time}
                              </p>
                              <p className="text-sm">
                                {item.Flight.departure_time}
                              </p>
                            </div>
                            <div className=" w-36 lg:w-56">
                              <p className="text-md font-semibold">
                                {item.Flight.from.city} ({" "}
                                {item.Flight.from.city_code} ){" "}
                              </p>
                              <p className="text-sm">{item.Flight.from.name}</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-center">
                            <div>
                              <p className="font-bold text-xl">
                                {item.Flight.arrival_time}
                              </p>
                              <p className="text-sm">
                                {item.Flight.arrival_date}
                              </p>
                            </div>
                            <div className=" w-36 lg:w-56">
                              <p className="text-md font-semibold">
                                {item.Flight.to.city} ({" "}
                                {item.Flight.to.city_code} ){" "}
                              </p>
                              <p className="text-sm">{item.Flight.to.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                          <hr></hr>
                          <div className="flex gap-3 items-center my-1 lg:my-3 ">
                            <GiBackpack className="text-xl text-green-500" />
                            <p>Cabin Baggage {item.cabin_baggage}</p>
                          </div>
                          <div className="flex gap-3 items-center my-1 lg:my-3">
                            <MdOutlineLuggage className="text-xl text-blue-500" />
                            <p>Baggage {item.baggage}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 ">
            <div className="w-full gap-5  bg-white  ">
              <div className="w-full rounded-md ">
                <div className=" items-center justify-center flex-row shadow-md  bg-white rounded-sm text-gray-600 tracking-wide antialiased ">
                  <div className="w-full   flex-row md:flex justify-between  px-7  py-5">
                    <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                      Return Flight
                    </h1>
                  </div>
                  <hr />
                  {!roundTicket && <span> </span>}
                  {roundTicket.length > 0 ? (
                    roundTicket.map((item) => (
                      <div className="p-7 ">
                        <div className="flex justify-between md:flex-row text-sm font-thin my-1">
                          <p>Depart Flight</p>
                          {item.Flight.departure_date}{" "}
                          {item.Flight.departure_time}{" "}
                        </div>
                        <div className="flex justify-between md:flex-row  text-sm font-thin my-1">
                          <p>Plane</p>
                          <figure className="max-w-md">
                            <Image
                              className="w-10 lg:w-12 flex "
                              src={item.photo}
                              alt="logo penerbangan"
                              width={50}
                              height={50}
                            ></Image>
                            <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">
                              {item.Flight.Plane.name}
                            </figcaption>
                          </figure>
                        </div>
                        <hr />

                        <div className="md:flex w-full justify-between    gap-2 text-gray-600 tracking-wide my-3 antialiased">
                          <div className="flex  gap-4 items-center">
                            <div>
                              <p className="font-bold text-xl">
                                {item.Flight.departure_time}
                              </p>
                              <p className="text-sm">
                                {item.Flight.departure_time}
                              </p>
                            </div>
                            <div className=" w-36 lg:w-56">
                              <p className="text-md font-semibold">
                                {item.Flight.from.city} ({" "}
                                {item.Flight.from.city_code} ){" "}
                              </p>
                              <p className="text-sm">{item.Flight.from.name}</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-center">
                            <div>
                              <p className="font-bold text-xl">
                                {item.Flight.arrival_time}
                              </p>
                              <p className="text-sm">
                                {item.Flight.arrival_date}
                              </p>
                            </div>
                            <div className=" w-36 lg:w-56">
                              <p className="text-md font-semibold">
                                {item.Flight.to.city} ({" "}
                                {item.Flight.to.city_code} ){" "}
                              </p>
                              <p className="text-sm">{item.Flight.to.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="gap-4  text-gray-600 tracking-wide antialiased text-sm my-3">
                          <hr></hr>
                          <div className="flex gap-3 items-center my-1 lg:my-3 ">
                            <GiBackpack className="text-xl text-green-500" />
                            <p>Cabin Baggage {item.cabin_baggage}</p>
                          </div>
                          <div className="flex gap-3 items-center my-1 lg:my-3">
                            <MdOutlineLuggage className="text-xl text-blue-500" />
                            <p>Baggage {item.baggage}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tiket Detail */}
        <div className="w-full  md:w-full lg:w-4/12">
          <div className="w-full md:justify-between ">
            {/* Price Detail */}
            <div className=" items-center justify-between flex-row shadow-md  bg-white rounded-md text-gray-600 tracking-wide antialiased mb-2">
              <div className="w-full   flex-row md:flex justify-between  px-7 py-5">
                <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                  Price Detail
                </h1>
              </div>
              <hr />
              <div className="p-7">
                {!oneWayTicket && <span></span>}
                {oneWayTicket.length > 0 ? (
                  oneWayTicket.map((item) => (
                    <div className="font-semibold gap-5 my-2 text-base flex justify-between">
                      <div className="flex items-center gap-2 ">
                        <p>Depart</p>
                        <p>{item.Flight.from.city_code}</p>
                        <IoAirplaneOutline />
                        <p>{item.Flight.to.city_code}</p>
                      </div>
                      <p>RP {item.price}</p>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
                {!roundTicket && <span></span>}
                {roundTicket.length > 0 ? (
                  roundTicket.map((item) => (
                    <div className="font-semibold gap-5 my-2 text-base flex justify-between">
                      <div className="flex items-center gap-2 ">
                        <p>Return</p>
                        <p>{item.Flight.from.city_code}</p>
                        <IoAirplaneOutline />
                        <p>{item.Flight.to.city_code}</p>
                      </div>
                      <p>RP {item.price}</p>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}

                <hr />
                <div className="flex justify-between text-lg font-bold tracking-wider my-2">
                  <p>total Price</p>
                  <p>{totalPrice}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <button
                  onClick={openModalBooking}
                  type="button"
                  className="focus:outline-none lg:w-full mt-2 text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-semibold antialiased tracking-wide rounded-md text-md  px-5 py-2.5 mr-2 mb-2 "
                >
                  Booking Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
