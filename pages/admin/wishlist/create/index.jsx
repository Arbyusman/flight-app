import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";

export default function CreatePromo() {
  const [field, setField] = useState({});
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

  async function doCreate(e) {
    e.preventDefault();

    const req = await fetch(`${process.env.API_ENDPOINT}api/v1/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(field),
    }).catch((err) => {
      throw err;
    });

    const data = await req.json();
    if (data.status === "OK") {
      console.log(data.status, "ini diaaaaa");
      router.push("/admin/wishlist");
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
            <h5 className="text-2xl text-center">Form Create Wishlist</h5>
          </div>
          <div className="mt-10">
            <div className="relative">
              <input
                type="text"
                id="floating_outlined"
                name="user_id"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={setValue}
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                User
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="floating_outlined"
                name="ticket_id"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={setValue}
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Ticket
              </label>
            </div>
          </div>

          <div className="flex justify-end ">
            <div className="flex justify-between mt-5 gap-5">
              <Button href="/admin/wishlist" color="success">
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
