import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";

export default function EditAirport() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    handelGetAirport();
  }, [router.isReady]);

  const handelGetAirport = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/airport/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("airport", data.data);
        setName(data.data.name);
        setCity(data.data.city);
        setCountry(data.data.country);
      });
  };

  async function handelUpdate() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/airport/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        city,
        country,
      }),
    }).catch((err) => {
      throw err;
    });

    const data = await response.json();

    console.log("data update", data.status);

    if (data.status === "OK") {
      alert("data bershail di ubah");
      router.push("/admin/airport");
    }
  }

  return (
    <Layout>
      <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
        <div className="w-100" method="PUT">
          <div className="font-bold ">
            <h5 className="text-2xl text-center">Form Create Ticket</h5>
          </div>
          <div className="mt-10">
            <div className="relative mt-3">
              <input
                type="text"
                id="name"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Airport Name
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="city"
                name="city"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label
                htmlFor="city"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                City
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="country"
                name="country"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <label
                htmlFor="country"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Country
              </label>
            </div>
          </div>

          <div className="flex justify-end ">
            <div className="flex justify-between mt-5 gap-5">
              <Button href="/admin/airport" color="success">
                Back
              </Button>

              <Button type="submit" name="submit" onClick={handelUpdate} color="info">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
