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

  const [notification, setNotification] = useState("");

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

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
        setId(data.data.id);
        setUsername(data.data.username);
        setImageProfile(data.data.photo);
      });
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <div className={`z-40 bg-blue-900 shadow-xl fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""}`}>
      <div className="pl-4 md:pl-16">
        <FaBars className="h-8 w-8 text-white cursor-pointer" onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="flex items-center text-white pr-4 md:pr-16">
        <Popover className="relative justify-center items-center">
          <Popover.Button className="outline-none mr-2 md:mr-3 cursor-pointer  ">
            <BiBell className="h-6 w-6 text-gray-500 hover:text-gray-700 active:text-gray-700 focus:text-gray-700" />
          </Popover.Button>
          <Transition enter="transition ease-out duration-100" enterFrom="transform scale-95" enterTo="transform scale-100" leave="transition ease-in duration=75" leaveFrom="transform scale-100" leaveTo="transform scale-95">
            <Popover.Panel className="absolute right-4 z-50 mt-2 -mr-7 bg-gray-100 shadow-sm rounded max-w-xs w-screen md:w-screen">
              <div className="relative p-3">
                <div className="flex justify-between items-center w-full">
                  <p className="text-gray-700 font-medium text-base tracking-normal antialiased items-center justify-center text-center">Notifications</p>
                  <button className="text-gray-700 font-medium text-base tracking-normal antialiased items-center justify-center text-center">Read All</button>
                </div>
                <hr></hr>
                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                  <div className="flex md:block">
                    {notification > 0 ? (
                      notification.map((item) => (
                        <div className="flex items-center justify-start" key={item.id}>
                          <div className="flex gap-2 text-xs text-gray-500 text-left w-full ">
                            {item.transaction_id}
                            <p className={`text-xs text-gray-500 text-left w-full ${item.isRead === false ? "bg-yellow-200" : "bg-red-400"} `}>
                              <button>{item.message}</button>
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <div id="already-login" className={isLoggedIn ? "" : "hidden"}>
          {imageProfile === null ? (
            <Dropdown arrowIcon={false} inline={true} label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}>
              <Dropdown.Item className="flex-row">
                <span className="block truncate text-sm font-medium">{username}</span>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link href={`admin/user/${id}`}>Profile</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="justify-center items-center flex gap-2">
                <BsArrowLeftSquare />
                <span>Sign out</span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Dropdown arrowIcon={false} inline={true} label={<Avatar fetchpriority="high" alt="User settings" img={imageProfile} rounded={true} className="border border-gray-400 rounded-full shadow-md " />}>
              <Dropdown.Item className="flex-row">
                <span className="block truncate text-sm font-medium">{username}</span>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link href={`admin/user/${id}`}>Profile</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="justify-center items-center flex gap-2">
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
