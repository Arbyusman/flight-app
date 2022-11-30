import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
import LogoImage from "../images/TakeOff.png";

export default function NavbarComponent() {
  const [openModal, setOpenModal] = useState(false);
import React, { useState } from "react";
import Modal from "./modal";
export default function Navbar() {
  const [modalLogin, setModalLogin] = useState(false);


  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <Image src={LogoImage} className="mr-3 h-16 w-20" alt="Flowbite Logo" />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          TakeOff
        </span> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div>
          <Button className="" onClick={() => setOpenModal(true)}>
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
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                  </div>
                  <TextInput id="password" type="password" required={true} />
                </div>
                <div className="w-full">
                  <Button>Log in to your account</Button>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="/modal"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div id="already-login" className="hidden">
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
              <span className="block text-sm">Arbiansyah</span>
              <span className="block truncate text-sm font-medium">
                arby@mail.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>History</Dropdown.Item>
            <Dropdown.Item>Wishlist</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
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
        <Navbar.Link href="/">Contact Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
