import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";

export default function CreateTicket() {
  const router = useRouter();
  const { id } = router.query;

  const [flight, setFlight] = useState([]);
  const [plane, setPlane] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [cabin_baggage, setCabin_Baggage] = useState("");
  const [baggage, setBaggage] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [flightId, setFlightId] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    getListFlight();
    handleGetTicket();
    getListPlane();
  }, [router.isReady]);

  const getListFlight = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/flight`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setFlight(data.data.data);
        console.log("dataFlight", data.data.data);
      });
  };

  const getListPlane = () => {
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
        console.log("datahere", data);
      });
  };

  const handleGetTicket = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("datahere", data);
        setFlightId(data.data.flight_id);
        setType(data.data.type);
        setPrice(data.data.price);
        setCabin_Baggage(data.data.cabin_baggage);
        setBaggage(data.data.baggage);
        setDesc(data.data.desc);
        setPhoto(data.data.photo);
      });
  };

  async function handleUpdate() {
    const body = new FormData();
    body.append("flight_id", flightId);
    body.append("type", type);
    body.append("price", price);
    body.append("cabin_baggage", cabin_baggage);
    body.append("baggage", baggage);
    body.append("desc", desc);
    body.append("photo", photo);

    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/ticket/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }).catch((err) => {
      throw err;
    });

    const data = await response.json();

    if (data.status === "OK") {
      alert("data berhasil di ubah");
      router.push("/admin/ticket");
    }
  }

  return (
    <Layout>
      <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
        <div className="font-bold ">
          <h5 className="text-2xl text-center">Form Update Ticket</h5>
        </div>
        <div className="mt-10">
          <div className="flex gap-5 justify-center items-center">
            <div className="relative w-full">
              <label for="flight_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Flight
              </label>

              <select
                id="flight_id"
                name="flight_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setFlightId(e.target.value)}
                value={flightId}>
                <option selected>Choose a Flight</option>
                {flight.map((flight) => (
                  <option key={flight.id} value={flight.id}>
                    <div className="">
                      <p>From :</p>
                      <p> {flight.from.name} </p>
                    </div>
                    <div>
                      <p>To :</p>
                      <p> {flight.to.name} </p>
                    </div>
                    <div>
                      <p> Plane : </p>
                      <p> {flight.Plane.name} </p>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}>
              <option selected disabled>
                Choose a Type
              </option>

              <option value="Economi">Economi</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              id="price"
              name="price"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              id="cabin_baggage"
              name="cabin_baggage"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={cabin_baggage}
              onChange={(e) => setCabin_Baggage(e.target.value)}
            />
            <label
              for="cabin_baggage"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Cabin Baggage
            </label>
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              id="baggage"
              name="baggage"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={baggage}
              onChange={(e) => setBaggage(e.target.value)}
            />
            <label
              for="baggage"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Baggage
            </label>
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              id="desc"
              name="desc"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label
              for="desc"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Description
            </label>
          </div>
          <div>
            <input
              className="mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              multiple
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
        </div>

        <div className="flex justify-end ">
          <div className="flex justify-between mt-5 gap-5">
            <Button href="/admin/ticket" color="success">
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
