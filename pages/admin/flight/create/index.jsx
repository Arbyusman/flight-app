import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";
import { TbPlaneInflight } from "react-icons/tb";

export default function CreatePromo() {
  const router = useRouter();
  const [field, setField] = useState({});

  const [plane, setPlane] = useState([]);
  const [airport, setAirport] = useState([]);

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
    handelGetAirport();
    handelGetPlane();
  }, []);

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
        console.log("data airport", data.data);
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
        setAirport(data.data);
        console.log("data plane", data.data);
      });
  };

  async function doCreate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const req = await fetch("https://beckend-takeoff-production-46fc.up.railway.app/api/v1/flight", {
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
      router.push("/admin/flight");
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
            <h5 className="text-2xl text-center">Form Create Flight</h5>
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
                  onChange={setValue}>
                  <option selected disabled>
                    Choose a Airport
                  </option>
                  {airport.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
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
                  onChange={setValue}>
                  <option selected disabled>
                    Choose a Airport
                  </option>
                  {airport.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
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
                  onChange={setValue}>
                  <option selected disabled>
                    Choose a Plane
                  </option>
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
                  placeholder="1000000"
                  required
                  onChange={setValue}
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
                  placeholder="1000000"
                  required
                  onChange={setValue}
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
                  placeholder="1000000"
                  required
                  onChange={setValue}
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
                  placeholder="1000000"
                  required
                  onChange={setValue}
                />
              </div>
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
