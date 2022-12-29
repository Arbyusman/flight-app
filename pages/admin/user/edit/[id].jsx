import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "flowbite-react";
import Layout from "../../../../components/admin/Layout";

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    handleGetUser();
  }, [router.isReady]);

  const handleGetUser = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/users/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("datahere", data);
        setEmail(data.data.email);
        setUsername(data.data.username);
        setfirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setAddress(data.data.address);
        setPhoto(data.data.photo);
        setPhone(data.data.phone);
      });
  };

  async function handleUpdate() {
    const body = new FormData();
    body.append("email", email);
    body.append("username", username);
    body.append("firstName", firstName);
    body.append("lastName", lastName);
    body.append("phone", phone);
    body.append("photo", photo);
    body.append("address", address);

    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }).catch((err) => {
      throw err;
    });

    const data = await response.json();

    if (data.status.users === "OK") {
      alert("Data Berhasil di Ubah ");
      router.push("/admin/user");
    }
  }

  return (
    <Layout>
      <div className="mt-20">
        <h5 className="text-center">Form Edit User</h5>
        <form clasName="shadow-xl mt-20">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              for="email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="username"
              id="username"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              for="username"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
              />
              <label
                for="firstName"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                First Name
              </label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label
                for="lastName"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last name
              </label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="phone"
                id="phone"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label
                for="phone"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone number
              </label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="address"
                id="address"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label
                for="address"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Address
              </label>
            </div>
            <div class="relative z-0 mb-6 w-full group ">
              <input
                class="mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
              <Button href="/admin/user" color="success">
                Back
              </Button>

              <Button type="submit" name="submit" onClick={handleUpdate} color="info">
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
