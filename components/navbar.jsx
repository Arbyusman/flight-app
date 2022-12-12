import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoImage from "../public/images/TakeOff.png";

export default function NavbarComponent() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `https://beckend-takeoff-production.up.railway.app/api/v1/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
    setIsLoggedIn(!!token);
  }, []);

  async function handelLogin() {
    const response = await fetch(
      "https://beckend-takeoff-production.up.railway.app/api/v1/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();
    console.log("data", data);

    if (data.status === "OK" && data.data.role === "admin") {
      setUser(data.data);
      localStorage.setItem("token", data.data.token);
      // localStorage.setItem("id", data.data.id);
      setOpenModal(false);
      alert("anda berhasil login sebagaian admin");
      setIsLoggedIn(true);
      router.push("/admin");
    } else if (data.status === "OK" && data.data.role === "buyer") {
      setUser(data.data);
      localStorage.setItem("token", data.data.token);
      // localStorage.setItem("id", data.data.id);
      setOpenModal(false);
      alert("anda berhasil login");
      setIsLoggedIn(true);
      router.push("/");
    } else {
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
    <Navbar fluid={true} rounded={true} className="sticky top-0 z-10">
      <Navbar.Brand href="/">
        <Image src={LogoImage} className="mr-3 h-12 w-16" alt="TakeOff Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div>
          {!isLoggedIn ? (
            <Button className="" onClick={() => setOpenModal(true)}>
              Login
            </Button>
          ) : (
            <div id="already-login">
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
                
                <Dropdown.Item>
                  <a href={`/profile/${user.id}`}>Profile</a>
                </Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item ><a href={`/history/${user.id}`}>History</a></Dropdown.Item>
                <Dropdown.Item>Wishlist</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          )}
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
                    Log in to your account
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
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/">About Us</Navbar.Link>
        <Navbar.Link href="/">Airline</Navbar.Link>
        <Navbar.Link href="/">Flight</Navbar.Link>
        <Navbar.Link href="promo">Promo</Navbar.Link>
        <Navbar.Link href="/">Contact Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
