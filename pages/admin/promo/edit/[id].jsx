/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/admin/Layout";
import { Button } from "flowbite-react";

const editPromo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [description, setDescription] = useState();
  const [discount, setDiscount] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    handleGetPromo();
  }, [router.isReady]);

  const handleGetPromo = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/promo/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setName(data.data.name);
        setCode(data.data.code);
        setDescription(data.data.description);
        setDiscount(data.data.discount);
        setPhoto(data.data.photo);
      });
  };

  async function handleUpdate() {
    const body = new FormData();
    body.append("name", name);
    body.append("code", code);
    body.append("description", description);
    body.append("discount", discount);
    body.append("photo", photo);

    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/promo/${id}`, {
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
      router.push("/admin/promo");
    }
  }

  return (
    <Layout>
      <div className="mt-10 block p-6 rounded-lg shadow-lg bg-white w-5/6 mx-auto">
        <div className="w-100">
          <div className="font-bold ">
            <h5 className="text-2xl text-center">Form Edit Promo</h5>
          </div>
          <div className="mt-10">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Name
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="code"
                name="code"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <label
                htmlFor="code"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Code
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="description"
                name="description"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="description"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Description
              </label>
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                id="discount"
                name="discount"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <label
                htmlFor="discount"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Discount
              </label>
            </div>
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

          <div className="flex justify-end ">
            <div className="flex justify-between mt-5 gap-5">
              <Button href="/admin/promo" color="success">
                Back
              </Button>

              <Button onClick={handleUpdate} type="submit" name="submit" color="info">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default editPromo;
