import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";

export default function CreateTicket() {
  const [loading, setLoading] = useState(true);

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

    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    fetch(`${process.env.API_ENDPOINT}api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.message === "UNAUTHORIZED" || data.data.role !== "admin") {
          router.push("/");
        } else {
          setLoading(false);
          getListFlight();
          handleGetTicket();
          getListPlane();
        }
      });
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
    const response = await fetch(
      `${process.env.API_ENDPOINT}api/v1/ticket/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();

    if (data.status === "OK") {
      alert("data berhasil di ubah");
      router.push("/admin/ticket");
    }
  }

  if (loading) {
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
      <Layout>
        <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
          <div className="font-bold ">
            <h5 className="text-2xl text-center">Form Update Ticket</h5>
          </div>
          <div className="mt-10">
            <div className="flex gap-5 justify-center items-center">
              <div className="relative w-full">
                <label
                  htmlFor="flight_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flight
                </label>

                <select
                  id="flight_id"
                  name="flight_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setFlightId(e.target.value)}
                  value={flightId}
                >
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
                htmlFor="type"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Type
              </label>

              <select
                id="type"
                name="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
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
                htmlFor="price"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
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
                htmlFor="cabin_baggage"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
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
                htmlFor="baggage"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
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
                htmlFor="desc"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
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

              <Button
                type="submit"
                name="submit"
                onClick={handleUpdate}
                color="info"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
