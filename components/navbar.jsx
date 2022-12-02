import { Navbar, Dropdown, Avatar } from "flowbite-react";
import ModalComponent from "./modal";
import Image from "next/image";
import LogoImage from "../public/images/TakeOff.png";

export default function NavbarComponent() {
  return (
    <Navbar fluid={true} rounded={true} className="sticky top-0 z-10">
      <Navbar.Brand href="/">
        <Image src={LogoImage} className="mr-3 h-12 w-16" alt="TakeOff Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div>
          <ModalComponent />
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
        <Navbar.Link href="promo">Promo</Navbar.Link>
        <Navbar.Link href="/">Contact Us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
