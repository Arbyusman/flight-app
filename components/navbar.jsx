import React, { useState, useEffect } from "react";
import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { BsArrowLeftSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../public/images/TakeOff.png";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";

export default function NavbarComponent() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [err, setErr] = useState("");
  const [imageProfile, setImageProfile] = useState("");

  const [notification, setNotification] = useState([]);
  const [notificationRead, setNotificationRead] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    whoami();
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

  const onSubmit = async (data) => {
    setLoginLoading(true);
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => {
      throw err;
    });

    const res = await response.json();

    if (res.status === "OK" && res.data.role === "admin") {
      localStorage.setItem("token", res.data.token);
      whoami();
      setIsLoggedIn(true);
      setOpenModal(false);
      router.push("/admin");
      setLoginLoading(false);
    } else if (res.status === "OK" && res.data.role === "buyer") {
      localStorage.setItem("token", res.data.token);
      whoami();
      setIsLoggedIn(true);
      setOpenModal(false);
      setLoginLoading(false);
    } else {
      setLoginLoading(false);
      const errMessage = res.message;
      setErr(errMessage);
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <Navbar rounded={true} className="sticky top-0 z-10  ">
      <Navbar.Toggle className="" />

      <Navbar.Brand href="/">
        <Image
          src={LogoImage}
          priority
          className="mr-3 h-12 w-16"
          alt="TakeOff Logo"
          width={100}
          height={100}
        />
      </Navbar.Brand>
      <div className="flex md:order-2 justify-center items-center ">
        {/* Notification */}

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
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              <span className="sr-only">Notifications</span>
              {notificationRead.length > 0 ? (
                <div className="inline-flex absolute -top-2  justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
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
              <Popover.Panel className="absolute rounded-md  overflow-y-scroll h-80  right-4 z-50 mt-2 -mr-7 bg-white shadow-sm  max-w-xs w-screen md:w-screen">
                <div className="relative p-3">
                  <div className="md:flex justify-between  bg-gray-100 px-4 py-2   sticky top-0 z-10 items-center w-full">
                    <p className="text-gray-700  font-medium text-lg  tracking-normal antialiased items-center justify-center text-center">
                      Notifications
                    </p>
                  </div>
                  <hr></hr>
                  <div className="mt-7 grid gap-4 grid-cols-1 overflow-hidden">
                    <div className="block ">
                      {notification.length > 0 ? (
                        (notification.sort((a, b) => a.isRead - b.isRead),
                        notification.map((item) => (
                          <div
                            className="flex items-center justify-start mb-2"
                            key={item.id}
                          >
                            <button
                              onClick={() => {
                                {
                                  handelReadNotif(item.id);
                                }
                              }}
                              className={`flex justify-between gap-2 text-sm shadow-md py-1 px-4 rounded-sm mb-1 items-center text-gray-500 text-left w-full  ${
                                item.isRead === true
                                  ? "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700"
                                  : "bg-gray-500 hover:bg-gray-600 text-gray-50 hover:text-white"
                              }`}
                            >
                              <span>{item.message}</span>
                            </button>
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

        {/* profile */}
        <div>
          <Button
            className={isLoggedIn ? "hidden" : ""}
            onClick={() => setOpenModal(true)}
          >
            Login
          </Button>
          <Modal
            show={openModal}
            size="md"
            popup={true}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                  </div>
                  <TextInput
                    id="email"
                    type="text"
                    placeholder="JohnDoe@company.com"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      },
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-xs text-red-600">
                      Email is required.
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-xs text-yellow-600">
                      Email is not valid.
                    </span>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: true,
                      validate: {
                        checkLength: (value) => value.length >= 6,
                        matchPattern: (value) =>
                          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*?=-_])/.test(
                            value
                          ),
                      },
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-xs text-red-600">
                      Password is required.
                    </span>
                  )}
                  {errors.password?.type === "checkLength" && (
                    <span className="text-xs text-yellow-600">
                      Password should be at-least 6 characters.
                    </span>
                  )}
                  {errors.password?.type === "matchPattern" && (
                    <span className="text-xs text-yellow-600">
                      Password should contain at least one uppercase letter,
                      lowercase letter, digit, and special symbol.
                    </span>
                  )}
                </div>
                <div className="w-full  items-center justify-center ">
                  <div
                    className=" text-sm  text-center text-red-700 rounded-lg "
                    role="alert"
                  >
                    <span className="font-medium">{err}</span>
                  </div>
                  <Button className="w-full" type="submit">
                    {!loginLoading && <span>Log in to your account</span>}
                    {loginLoading && (
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
                  </Button>
                </div>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <Link
                    href="/register"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </Modal.Body>
          </Modal>
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
                  <Link href={`/profile/${userId}`}>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/history/${userId}`}>History</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/wishlist/${userId}`}>Wishlist</Link>
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
                  <Link href={`/profile/${userId}`}>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/history/${userId}`}>History</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/wishlist/${userId}`}>Wishlist</Link>
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
      <Navbar.Collapse>
        <Navbar.Link href="/" active={currentRoute === "/" ? true : false}>
          Home
        </Navbar.Link>
        {/* <Navbar.Link
          href="/"
          active={currentRoute === "/about-us" ? true : false}
        >
          About Us
        </Navbar.Link> */}
        {/* <Navbar.Link href="/">Airline</Navbar.Link> */}
        {/* <Navbar.Link href="/" active={}>Flight</Navbar.Link> */}
        {/* <Navbar.Link
          href="/promo"
          active={currentRoute === "/promo" ? true : false}
        >
          Promo
        </Navbar.Link> */}
        {/* <Navbar.Link href="/" active={}>Contact Us</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
