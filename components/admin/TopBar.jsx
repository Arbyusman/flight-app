import { Fragment, useEffect, useState } from "react";

import { BiBell, BiCheck } from "react-icons/bi";
import { BsArrowLeftSquare } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Dropdown, Avatar } from "flowbite-react";
import { Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar({ showNav, setShowNav }) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageProfile, setImageProfile] = useState("");

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [notification, setNotification] = useState([]);
  const [notificationRead, setNotificationRead] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      whoami();
    }
    setIsLoggedIn(!!token);
  }, []);

  const whoami = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setUserId(data.data.id);
        setUsername(data.data.username);
        setImageProfile(data.data.photo);
        if (data.data.id) {
          fetch(
            `${process.env.API_ENDPOINT}api/v1/notification/user/${data.data.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())

            .then((data) => {
              setNotification(data.data);
              const notification = data.data.filter(
                (item) => item.isRead == false
              );

              setNotificationRead(notification);
            });
        }
      });
  };

  const handelReadNotif = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/notification/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("res read", data);
        if (data.status === "OK") {
          fetch(
            `${process.env.API_ENDPOINT}api/v1/notification/user/${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())

            .then((data) => {
              setNotification(data.data);
              const notification = data.data.filter(
                (item) => item.isRead == false
              );

              setNotificationRead(notification);
            });
        }
        // handleGetNotif();
      });
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <div
      className={`z-40 bg-blue-900 shadow-xl fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <FaBars
          className="h-8 w-8 text-white cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center text-white pr-4 md:pr-16">
        {isLoggedIn && (
          <Popover className="relative  justify-center items-center ">
            <Popover.Button
              onClick={() => {
                {
                  whoami();
                  // handleGetNotif();
                }
              }}
              className="outline-none mr-2 md:mr-6 cursor-pointer   "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              <span class="sr-only">Notifications</span>
              {notificationRead.length > 0 ? (
                <div class="inline-flex absolute -top-2  justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                  {notificationRead.length}
                </div>
              ) : (
                <div></div>
              )}
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel className="absolute  overflow-y-scroll h-80  right-4 z-50 mt-2 -mr-7 bg-white shadow-sm rounded max-w-xs w-screen md:w-screen">
                <div className="relative p-3">
                  <div className="md:flex justify-between shadow-md bg-gray-300 px-4 py-2   sticky top-0 z-10 items-center w-full">
                    <p className="text-gray-700  font-medium text-lg  tracking-normal antialiased items-center justify-center text-center">
                      Notifications
                    </p>
                  </div>
                  <hr></hr>
                  <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                    <div className="block ">
                      {notification.length > 0 ? (
                        (notification.sort((a, b) => b.id - a.id),
                        notification.map((item) => (
                          <div
                            className="flex items-center justify-start mb-1"
                            key={item.id}
                          >
                            <div
                              className={`flex justify-between gap-2 text-sm shadow-md py-1 px-4 rounded-sm mb-1 items-center text-gray-500 text-left w-full  ${
                                item.isRead === true
                                  ? "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700"
                                  : "bg-gray-600 hover:bg-gray-700 text-gray-50 hover:text-white"
                              }`}
                            >
                              <span>{item.message}</span>
                              <button
                                className={`bg-gray-200 px-4 py-0.5 rounded-sm hover:bg-gray-300 ${
                                  item.isRead === true
                                    ? " hidden"
                                    : " text-gray-600 hover:text-gray-700"
                                }`}
                                onClick={() => {
                                  {
                                    handelReadNotif(item.id);
                                  }
                                }}
                              >
                                <span>Read</span>
                              </button>{" "}
                            </div>
                          </div>
                        )))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
        <div id="already-login" className={isLoggedIn ? "" : "hidden"}>
          {imageProfile === null ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }
            >
              <Dropdown.Item className="flex-row">
                <span className="block truncate text-sm font-medium">
                  {username}
                </span>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link href={`admin/user/${id}`}>Profile</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item
                onClick={handleLogout}
                className="justify-center items-center flex gap-2"
              >
                <BsArrowLeftSquare />
                <span>Sign out</span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  fetchpriority="high"
                  alt="User settings"
                  img={imageProfile}
                  rounded={true}
                  className="border border-gray-400 rounded-full shadow-md "
                />
              }
            >
              <Dropdown.Item className="flex-row">
                <span className="block truncate text-sm font-medium">
                  {username}
                </span>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link href={`admin/user/${id}`}>Profile</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item
                onClick={handleLogout}
                className="justify-center items-center flex gap-2"
              >
                <BsArrowLeftSquare />
                <span>Sign out</span>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}
