import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import LogoImage from "../public/images/TakeOff.png";

import { useRouter } from "next/router";

export default function NavbarComponent() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    console.log("status", data.status);
    console.log("status", data.data.token);
    if (data.status === "OK") {
      localStorage.setItem("token", data.data.token);
      setOpenModal(false);
      setIsLoggedIn(true);
      router.push("/");
    }

    const userdata = data.data;
    setUser(userdata);

    console.log("data user", data.data);

    console.log(email, password);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
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
                <Dropdown.Header>
                  <span className="block text-sm">{user.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>History</Dropdown.Item>
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
                    placeholder="name@company.com"
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <Button onClick={handelLogin}>Log in to your account</Button>
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
