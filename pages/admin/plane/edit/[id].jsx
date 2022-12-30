import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";

export default function EditPlane() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    handleGetPlane();
  }, [router.isReady]);

  const handleGetPlane = () => {
    const token = localStorage.getItem("token");
    fetch(`https://beckend-takeoff-production-46fc.up.railway.app/api/v1/planes/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("planes", data.data);
        setName(data.data.name);
        setCapacity(data.data.capacity);
        setStatus(data.data.status);
      });
  };

  async function handleUpdate() {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://beckend-takeoff-production-46fc.up.railway.app/api/v1/planes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        capacity,
        status,
      }),
    }).catch((err) => {
      throw err;
    });

    const data = await response.json();

    console.log("data update", data.status);

    if (data.status === "OK") {
      alert("Data Berhasil di ubah");
      router.push("/admin/plane");
    }
  }

  return (
    <Layout>
      <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
        <div className="w-100" method="PUT">
          <div className="font-bold ">
            <h5 className="text-2xl text-center">Form Edit Plane</h5>
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
                Plane Name
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="capacity"
                name="capacity"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <label
                htmlFor="capacity"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Capicity
              </label>
            </div>

            <div className="relative mt-3">
              <label for="plane_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-500 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option selected>Choose a Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end ">
            <div className="flex justify-between mt-5 gap-5">
              <Button href="/admin/plane" color="success">
                Back
              </Button>

              <Button type="submit" name="submit" onClick={handleUpdate} color="info">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
