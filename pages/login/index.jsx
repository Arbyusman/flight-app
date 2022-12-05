/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import {

  Dropdown,
  Avatar,
  Button,
 
} from "flowbite-react";
import React, { useState,useEffect } from "react";

import { useRouter } from "next/router";


export default function login() {
  const [field, setField] = useState({});
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  
  
  function setValue(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;

    console.log({name,value});

    setField({
      ... field,
      [name]: value
    });
  }

  
  async function doLogin(e) {
    e.preventDefault();


    const response = await fetch('https://beckend-takeoff-production.up.railway.app/api/v1/login', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(field)
    });

    const data = await response.json();
    if (data.status === "OK") {
      localStorage.setItem("token", data.data.token);
      setIsLoggedIn(true);
      alert("Kamu Berhasil Login");

      router.push("/");
    } else {
      const errStatus = data.status;
      const errMessage = data.message;
      setErr(`${errStatus} ${errMessage}`);
    }

    console.log(data.data, "data here");

    const userdata = data.data;
    setUser(userdata);
    console.log(data)

    setField({});
    e.target.reset();

    
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />

          </div>
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Login Account
              </h1>
              <form onSubmit={ doLogin } className="space-y-4 md:space-y-6" action="#">
                 
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  " placeholder="name@company.com"  onChange={setValue} />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••"  className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  "  onChange={setValue}/>
                  </div>
                  {/* <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  " required=""/>
                  </div> */}
                  <div>
                  {!isLoggedIn ? (
            <Button className="" type="submit" name="submit">
              Login
            </Button>
          ) : (
            <div id="already-login">
              <Dropdown
                arrowIcon={false}
                inline={true}
                // label={
                //   <Avatar
                //     alt="User settings"
                //     img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                //     rounded={true}
                //   />
                // }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <a href={"profile/" + user.id}>Profile</a>
                </Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>History</Dropdown.Item>
                <Dropdown.Item>Wishlist</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          )}
                  </div>
              </form>
          </div>
      </div>
         
        </div>
      </div>
      
    </section>
  );
}
