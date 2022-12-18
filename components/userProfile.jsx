import React, { useState, useEffect } from "react";
import Link from "next/link";

import { FaUserEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

import { BiSave } from "react-icons/bi";
import { HiArrowSmLeft } from "react-icons/hi";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();

  const [editProfile, setEditProfile] = useState(false);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);

  const [saveLoading, setSaveLoading] = useState(false);

  const whoami = () => {
    const token = localStorage.getItem("token");
    fetch(`https://beckend-takeoff-production.up.railway.app/api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setId(data.data.id);
        setEmail(data.data.email);
        setUsername(data.data.username);
        setfirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setAddress(data.data.address);
        setPhoto(data.data.photo);
        setPhone(data.data.phone);
      });
  };

  useEffect(() => {
    whoami();
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");

    setLoading(false);
  }, []);

  async function handelUpdate() {
    setSaveLoading(true);

    setTimeout(() => {
      setSaveLoading(false);
    }, 2500);

    const body = new FormData();
    body.append("firstName", firstName);
    body.append("lastName", lastName);
    body.append("phone", phone);
    body.append("photo", photo);
    body.append("address", address);

    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://beckend-takeoff-production.up.railway.app/api/v1/users/${id}`,
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

    setTimeout(() => {
      setSaveLoading(false);
    }, 2000);

    const data = await response.json();

    if (data.status === "OK") {
      setEditProfile(false);
      setPhoto(data.data.photo);
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
      <div className="justify-center items-center flex-row">
        {!editProfile ? (
          <div className="w-full">
            <div className="flex justify-center items-center">
              <div className="w-full md:w-2/3 flex bg-white rounded-md mt-5 justify-between shadow-md p-7">
                <div className="text-gray-700">
                  <h1 className="font-semibold tracking-wide antialiased text-lg">
                    Profile
                  </h1>
                </div>
                <Link
                  href="/"
                  className="flex text-gray-600 hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 text-center gap-1"
                >
                  <HiArrowSmLeft className="text-xl" />
                  <span>Back</span>
                </Link>
              </div>
              <hr></hr>
            </div>

            <div className=" flex justify-center items-center ">
              <div className="md:w-2/3 w-96  bg-white rounded-t-md mt-5 shadow-md py-4 px-1  lg:p-7 md:flex flex-row justify-center ">
                <div className="lg:w-2/3 md:w-full flex justify-center ">
                  <figure className="flex-row w-full items-center justify-center py-5 ">
                    {photo === null ? (
                      <div className="flex justify-center w-full">
                        <img
                          fetchpriority="high"
                          className="max-w-full lg:w-60 h-auto rounded-lg "
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="image profil"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center w-full">
                        <img
                          fetchpriority="high"
                          className="max-w-full lg:w-60 h-auto rounded-lg "
                          src={photo}
                          alt="image profil"
                        />
                      </div>
                    )}
                    <figcaption className="mt-1 text-center text-gray-700 text-lg ">
                      {username}
                    </figcaption>

                    <figcaption className="mt-1 text-center text-gray-700 text-sm ">
                      {email}
                    </figcaption>
                  </figure>
                </div>
                <div className="w-full ">
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
                        className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                        placeholder="John Doe"
                        value={`${firstName}${lastName}`}
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
                        className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                        placeholder="John"
                        value={firstName}
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
                        className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                        placeholder="Doe"
                        value={lastName}
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
                        className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                        placeholder="+628222"
                        value={phone}
                        disabled
                      />
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
                        value={address}
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
          // edit profile
          <div className="w-full">
            <div className="flex justify-center items-center">
              <div className="md:w-2/3 flex w-full bg-white rounded-md mt-5 justify-between shadow-md p-7">
                <div className="text-gray-700">
                  <h1 className="font-semibold tracking-wide antialiased text-lg">
                    Edit Profile
                  </h1>
                </div>
              </div>
              <hr></hr>
            </div>

            <div className="gap-2 flex items-center justify-center ">
              <div className="md:w-2/3 flex bg-white rounded-md mt-5 justify-center shadow-md p-7">
                <div className="w-full">
                  <div className="flex-row md:flex w-full px-4 gap-4">
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
                        className="block w-full p-2 text-gray-800   rounded-sm border-gray-300 border-2   text-base  focus:bg-gray-50   focus:border-black focus:ring-0 focus:shadow-none"
                        placeholder="John"
                        value={username}
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
                        className="block w-full p-2 text-gray-800   rounded-sm border-gray-300 border-2   text-base  focus:bg-gray-50   focus:border-black focus:ring-0 focus:shadow-none"
                        placeholder="John"
                        value={email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex-row md:flex   w-full px-4  gap-4">
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
                        className="block w-full p-2 text-gray-800   rounded-sm border-gray-300 border-2   text-base  focus:bg-gray-50   focus:border-black focus:ring-0 focus:shadow-none"
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
                        className="block w-full p-2 text-gray-800    border-gray-300 border-2   text-base  focus:bg-gray-50   focus:border-black focus:ring-0 focus:shadow-none"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>
                  </div>

                  <div className="flex-row md:flex w-full px-4  gap-4">
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
                        className="block w-full p-2 text-gray-800    border-gray-300 border-2   text-base  focus:bg-gray-50   focus:border-black focus:ring-0 focus:shadow-none"
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
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
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
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 bg-gray-50  "
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-0 focus:border-black "
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
                        {!saveLoading && <BiSave className="text-white" />}
                        {saveLoading && (
                          <svg
                            role="status"
                            className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
                              fill="#1C64F2"
                            />
                          </svg>
                        )}
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
