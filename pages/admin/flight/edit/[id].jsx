import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";
import { TbPlaneInflight } from "react-icons/tb";

export default function CreatePromo() {
  const router = useRouter();

  const [plane, setPlane] = useState([]);
  const [airport, setAirport] = useState([]);
  const [arrival_time, setArrival_time] = useState("");
  const [arrival_date, setArrival_date] = useState("");
  const [departure_time, setDeparture_time] = useState("");
  const [departure_date, setDeparture_date] = useState("");

  const [from_airport_id, setFromAirportId] = useState("");
  const [to_airport_id, setToAirportId] = useState("");
  const [plane_id, setPlaneId] = useState("");

  const [err, setErr] = useState("");
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    handelGetAirport();
    handelGetPlane();
    handleGetFlight();
  }, [router.isReady]);

  const handelGetPlane = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/planes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setPlane(data.data);
        console.log("data plane", data.data);
      });
  };

  const handelGetAirport = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/airport`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("data airport", data.data);
        setAirport(data.data);
      });
  };

  const handleGetFlight = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/flight/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setFromAirportId(data.data.from_airport_id);
        setToAirportId(data.data.to_airport_id);
        setPlaneId(data.data.plane_id);
        setArrival_time(data.data.arrival_time);
        setArrival_date(data.data.arrival_date);
        setDeparture_time(data.data.departure_time);
        setDeparture_date(data.data.departure_date);
      });
  };

  async function handleUpdate() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/flight/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_airport_id,
        to_airport_id,
        plane_id,
        arrival_time,
        arrival_date,
        departure_time,
        departure_date,
      }),
    }).catch((err) => {
      throw err;
    });

    const data = await response.json();
    if (data.status === "OK") {
      alert("Data Berhasil di Ubah");
      router.push("/admin/flight");
    }
    console.log(data.status, "data here");

    console.log(data);
  }

  return (
    <Layout>
      <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
        <div className="font-bold ">
          <h5 className="text-2xl text-center">Form Edit Flight</h5>
        </div>
        <div className="mt-10">
          <div className="flex gap-5 justify-center items-center">
            <div className="relative w-full">
              <label for="from_airport_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                From Aiport
              </label>
              <select
                id="from_airport_id"
                name="from_airport_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setFromAirportId(e.target.value)}
                value={from_airport_id}>
                <option selected>Choose a Airport</option>
                {airport.map((airport) => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </select>
            </div>
            <TbPlaneInflight className="-mb-5 text-5xl text-gray-700" />
            <div className="relative w-full">
              <label for="to_airport_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                To Aiport
              </label>
              <select
                id="to_airport_id"
                name="to_airport_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setToAirportId(e.target.value)}
                value={to_airport_id}>
                <option selected>Choose a Airport</option>
                {airport.map((airport) => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-14 mt-3 ">
            <div className="relative w-full">
              <label for="plane_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Plane
              </label>
              <select
                id="plane_id"
                name="plane_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPlaneId(e.target.value)}
                value={plane_id}>
                <option selected>Choose a Plane</option>
                {plane.map((item) => (
                  <option key={item.id} value={item.id}>
                    <p>{item.name}</p>
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-14 mt-3 ">
            <div className="relative w-full">
              <label for="departure_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Departure Date
              </label>
              <input
                type="date"
                id="departure_date"
                name="departure_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={departure_date}
                onChange={(e) => setDeparture_date(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label for="departure_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Departure Time
              </label>
              <input
                type="time"
                id="departure_time"
                name="departure_time"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={departure_time}
                onChange={(e) => setDeparture_time(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-14 mt-3 ">
            <div className="relative w-full">
              <label for="departure_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Arrival Date
              </label>
              <input
                type="date"
                id="arrival_date"
                name="arrival_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={arrival_date}
                onChange={(e) => setArrival_date(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label for="departure_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Arrival Time
              </label>
              <input
                type="time"
                id="arrival_time"
                name="arrival_time"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={arrival_time}
                onChange={(e) => setArrival_time(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end ">
          <div className="flex justify-between mt-5 gap-5">
            <Button href="/admin/flight" color="success">
              Back
            </Button>

            <Button type="submit" name="submit" onClick={handleUpdate} color="info">
              Update
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
