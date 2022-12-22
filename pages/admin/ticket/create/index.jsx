import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";
import { Dropdown } from "flowbite-react";

export default function CreatePromo() {
  const [field, setField] = useState({});
  const [flight, setFlight] = useState([]);

  const router = useRouter();
  const [err, setErr] = useState("");

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    console.log({ name, value });

    setField({
      ...field,
      [name]: value,
    });
  }

  useEffect(() => {
    getListFlight();
  }, []);

  const getListFlight = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/flight`, {
      method: "GET",
      Authorization: `Bearer ${token}`,
    })
      .then((res) => res.json())

      .then((data) => {
        setFlight(data.data.data);
        console.log("dataFlight", data.data.data);
      });
  };

  async function doCreate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const req = await fetch(`${process.env.API_ENDPOINT}api/v1/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(field),
    }).catch((err) => {
      throw err;
    });

    const data = await req.json();
    if (data.status === "OK") {
      console.log(data.status, "ini diaaaaa");
      router.push("/admin/ticket");
    } else {
      const errStatus = data.status;
      const errMessage = data.message;
      setErr(`${errStatus} ${errMessage}`);
    }
    console.log(data.data, "data here");

    setField({});
    e.target.reset();

    console.log(data);
  }

  return (
    <Layout>
      <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
        <form onSubmit={doCreate} className="w-100">
          <div className="font-bold ">
            <h5 className="text-2xl text-center">Form Create Ticket</h5>
          </div>
          <div className="mt-10">
            <div className="flex gap-5 justify-center items-center">
              <div className="relative w-full">
                <label for="flight_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Flight
                </label>

                <select
                  id="flight_id"
                  name="flight_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={setValue}>
                  <option selected disabled>
                    Choose a Flight
                  </option>
                  {flight.map((item) => (
                    <option key={item.id} value={item.id}>
                      <div className="">
                        <p>From :</p>
                        <p> {item.from.name} </p>
                      </div>
                      <div>
                        <p>To :</p>
                        <p> {item.to.name} </p>
                      </div>
                      <div>
                        <p>Arrival Time :</p>
                        <p> {item.arrival_time} </p>
                      </div>
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-full">
                <label for="flight_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  one way
                </label>

                <select
                  id="flight_id"
                  name="flight_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={setValue}>
                  <option selected disabled>
                    Choose a Flight
                  </option>
                  {flight.map((item) => (
                    <option key={item.id} value={item.id}>
                      <div className="">
                        <p>From :</p>
                        <p> {item.from.name} </p>
                      </div>
                      <div>
                        <p>To :</p>
                        <p> {item.to.name} </p>
                      </div>
                      <div>
                        <p>Arrival Time :</p>
                        <p> {item.arrival_time} </p>
                      </div>
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-full">
                <label for="return_flight_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Round Trip
                </label>

                <select
                  id="return_flight_id"
                  name="return_flight_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={setValue}>
                  <option selected disabled>
                    Choose a Flight
                  </option>
                  {flight.map((item) => (
                    <option key={item.id} value={item.id}>
                      <div className="">
                        <p>From :</p>
                        <p> {item.from.name} </p>
                      </div>
                      <div>
                        <p>To :</p>
                        <p> {item.to.name} </p>
                      </div>
                      <div>
                        <p>Arrival Time :</p>
                        <p> {item.arrival_time} </p>
                      </div>
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative mt-3">
              <label
                for="type"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Type
              </label>

              <select
                id="type"
                name="type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={setValue}>
                <option selected disabled>
                  Choose a Type
                </option>

                <option value="ekonomi">Ekonomi</option>
                <option value="bisnis">Bisnis</option>
              </select>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="price"
                name="price"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={setValue}
              />
              <label
                for="price"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Price
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="desc"
                name="desc"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={setValue}
              />
              <label
                for="desc"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Description
              </label>
            </div>
          </div>

          <div className="flex justify-end ">
            <div className="flex justify-between mt-5 gap-5">
              <Button href="/admin/ticket" color="success">
                Back
              </Button>

              <Button type="submit" name="submit" color="info">
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
