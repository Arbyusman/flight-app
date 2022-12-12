import React, { useState, useEffect } from "react";

import Image from "next/image";
import imageProfil from "../public/images/mega.jpg";
import { FaUserEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();

  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState({});

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");

    fetch(`https://beckend-takeoff-production.up.railway.app/api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setUser(data.data);
      });
    setLoading(false);
  }, []);

  async function handelUpdate() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://beckend-takeoff-production.up.railway.app/api/v1/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          username,
          firstName,
          lastName,
          address,
          photo,
          phone,
        }),
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();

    if (data.status === "OK") {
      alert("data berhasil di ubah");
      setEditProfile(false);
    }

    console.log("status", data);
  }

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className=" flex justify-center mt-5  ">
        {!editProfile ? (
          <div className="w-full mx-3 rounded-md md:w-1/2 items-center shadow-xl bg-white">
            <div className="flex shadow-md w-full ">
              <button className=" rounded-md ml-5 ">
                <p className="text-lg font-bold text-black px-3 py-3 flex items-center justify-center gap-2">
                  {" "}
                  {/* <RiUser3Line className="text-green-500" /> */}
                  Profile
                </p>
              </button>
            </div>
            <hr></hr>

            <div className="mt-5 md:mx-5 ">
              <div className="justify-center items-start flex gap-4 my-6">
                <div className="w-2/3 shadow-md ">
                  <div className="flex flex-col justify-center py-5 items-center">
                    <img
                      className="h-32 w-32 rounded-full shadow-sm "
                      src={user.photo}
                      alt="image profil"
                    />
                    <p className="text-xs">{user.username}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="w-full shadow-md">
                  {/* <div className="flex w-full px-4 ">
                  <div className="my-1 w-full">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      value={user.username}
                      disabled
                    />
                  </div>
                </div> */}
                  <div className="flex w-full px-4 ">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John Doe"
                        value={`${user.firstName}  ${user.lastName}`}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex w-full px-4  gap-4">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        value={user.firstName}
                        disabled
                      />
                    </div>
                    <div className="my-1 w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        value={user.lastName}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex w-full px-4  gap-4">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Contact
                      </label>
                      <input
                        type="phone"
                        id="phone"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="+628222"
                        value={user.phone}
                        disabled
                      />
                    </div>
                    {/* <div className="my-1 w-full">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="Email"
                      id="email"
                      className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John@mail.com"
                      value={user.email}
                      disabled
                    />
                  </div> */}
                  </div>
                  <div className="flex w-full px-4 ">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="adress here"
                        value={user.address}
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <div className=" justify-center items-center flex">
                    <button
                      className=" rounded-md my-3 bg-green-500 "
                      onClick={() => setEditProfile(true)}
                    >
                      <p className="text-lg font-bold text-white  px-3 py-3 flex items-center justify-center gap-2">
                        {" "}
                        <FaUserEdit className="text-white" />
                        Edit Profile
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mx-3 rounded-md md:w-1/2 items-center shadow-xl bg-white">
            <div className="flex shadow-md w-full ">
              <button className=" rounded-md ml-5 ">
                <p className="text-lg font-bold text-black px-3 py-3 flex items-center justify-center gap-2">
                  {" "}
                  {/* <RiUser3Line className="text-green-500" /> */}
                  Profile
                </p>
              </button>
            </div>
            <hr></hr>

            <div className="mt-5 md:mx-5">
              <div className="justify-center items-start flex gap-4 my-6">
                {/* <div className="w-2/3 shadow-md ">
                <div className="flex flex-col justify-center py-5 items-center">
                  <Image
                    class="h-32 w-32 rounded-full shadow-sm "
                    src={imageProfil}
                    alt="image profil"
                  />
                  <p className="font-medium text-lg ">John Doe</p>
                  <p className="text-xs">username</p>
                  <p className="text-xs">johndoe@mail.com</p>
                </div>
              </div> */}
                <div className="w-full">
                  <div className="flex w-full px-4 gap-4">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        // onChange={(e) => setUsername(e.target.value)}
                        value={user.username}
                        disabled
                      />
                    </div>
                    <div className="my-1 w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        // onChange={(e) => setEmail(e.target.value)}
                        value={user.email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex w-full px-4  gap-4">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        onChange={(e) => setfirstName(e.target.value)}
                        value={firstName}
                      />
                    </div>
                    <div className="my-1 w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>
                  </div>

                  <div className="flex w-full px-4  gap-4">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Contact
                      </label>
                      <input
                        type="phone"
                        id="phone"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="+628222"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                    <div className="my-1 w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Upload photo
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={(e) => setPhoto(e.target.value)}
                        value={photo}
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        PNG or JPG
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full px-4 ">
                    <div className="my-1 w-full">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="adress here"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      ></textarea>
                    </div>
                  </div>
                  <div className=" justify-center items-center flex gap-10">
                    <button
                      className=" rounded-md my-3 bg-red-500 "
                      onClick={(e) => setEditProfile(false)}
                    >
                      <p className="text-lg font-bold text-white  px-3 py-3 flex items-center justify-center gap-2">
                        {" "}
                        <BsTrash className="text-white" />
                        Batal
                      </p>
                    </button>
                    <button
                      className=" rounded-md my-3 bg-green-500 "
                      onClick={handelUpdate}
                    >
                      <p className="text-lg font-bold text-white  px-3 py-3 flex items-center justify-center gap-2">
                        {" "}
                        <BiSave className="text-white" />
                        Save
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
