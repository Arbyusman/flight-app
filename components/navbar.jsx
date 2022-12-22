import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";
import { BsArrowLeftSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoImage from "../public/images/TakeOff.png";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { BiBell } from "react-icons/bi";

export default function NavbarComponent() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [err, setErr] = useState("");
  const [imageProfile, setImageProfile] = useState("");

  const [notification, setNotification] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      whoami();
      getNotifications();
    }
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
        setId(data.data.id);
        setUsername(data.data.username);
        setImageProfile(data.data.photo);
      });
  };

  const getNotifications = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/notification/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setNotification(data.data);
        console.log("notif", data.data);
      });
  };

  async function handelLogin() {
    setLoginLoading(true);

    const response = await fetch("${process.env.API_ENDPOINT}api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((err) => {
      throw err;
    });

    const data = await response.json();

    if (data.status === "OK" && data.data.role === "admin") {
      localStorage.setItem("token", data.data.token);
      whoami();
      setIsLoggedIn(true);
      setOpenModal(false);
      router.push("/admin");
      setSaveLoading(false);
    } else if (data.status === "OK" && data.data.role === "buyer") {
      localStorage.setItem("token", data.data.token);
      whoami();
      setIsLoggedIn(true);
      setOpenModal(false);
      router.push("/");
      setSaveLoading(false);
    } else {
      setSaveLoading(false);
      const errStatus = data.status;
      const errMessage = data.message;
      setErr(`${errStatus} ${errMessage}`);
    }
  }

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
        <Image src={LogoImage} className="mr-3 h-12 w-16" alt="TakeOff Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2 justify-center items-center ">
        {/* Notification */}
        <Popover className="relative justify-center items-center">
          <Popover.Button className="outline-none mr-2 md:mr-3 cursor-pointer  ">
            <BiBell className="h-6 w-6 text-gray-500 hover:text-gray-700 active:text-gray-700 focus:text-gray-700" />
          </Popover.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Popover.Panel className="absolute right-4 z-50 mt-2 -mr-7 bg-white shadow-sm rounded max-w-xs w-screen md:w-screen">
              <div className="relative p-3">
                <div className="flex justify-center items-center w-full">
                  <p className="text-gray-700 font-medium text-base tracking-normal antialiased items-center justify-center text-center">
                    Notifications
                  </p>
                </div>
                <hr></hr>
                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                  <div className="flex">
                    {/* {notification.map((item) => (
                      <div key={item.id} className="mx-2">
                        <p className="text-xs text-gray-500 text-justify w-full ">
                          1{item.message}
                        </p>
                      </div>
                    ))} */}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
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
              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="JohnDoe@company.com"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    required={true}
                    value={password}
                    minLength="5"
                    placeholder="••••••••"
                    pattern="[a-z0-9]{1,15}"
                    title="Password should be digits (0 to 9) or alphabets (a to z)."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full  items-center justify-center ">
                  <div
                    className=" text-sm  text-center text-red-700 rounded-lg "
                    role="alert"
                  >
                    <span className="font-medium">{err}</span>
                  </div>
                  <Button className="w-full" onClick={handelLogin}>
                    {!loginLoading && <span>Log in to your account</span>}
                    {loginLoading && (
                      <svg
                        role="status"
                        class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
                  <a
                    href="register"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </div>
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
                  <Link href={`profile/${id}`}>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`history/${id}`}>History</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`wishlist/${id}`}>Wishlist</Link>
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
                  <Link href={`/profile/${id}`}>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/history/${id}`}>History</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={`/wishlist/${id}`}>Wishlist</Link>
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
        <Navbar.Link
          href="/"
          active={currentRoute === "/about-us" ? true : false}
        >
          About Us
        </Navbar.Link>
        {/* <Navbar.Link href="/">Airline</Navbar.Link> */}
        {/* <Navbar.Link href="/" active={}>Flight</Navbar.Link> */}
        <Navbar.Link
          href="/promo"
          active={currentRoute === "/promo" ? true : false}
        >
          Promo
        </Navbar.Link>
        {/* <Navbar.Link href="/" active={}>Contact Us</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
