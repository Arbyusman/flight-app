/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Label, TextInput } from "flowbite-react";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

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

    if (data.status === "OK" && data.data.role === "admin") {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.id);
      alert("anda berhasil login sebagaian admin");
      router.push("/admin");
    } else if (data.status === "OK" && data.data.role === "buyer") {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("id", data.data.id);
      alert("anda berhasil login");
      router.push("/");
    } else {
      const errStatus = data.status;
      const errMessage = data.message;
      setErr(`${errStatus} ${errMessage}`);
    }
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
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl text-center  font-medium text-gray-900 dark:text-white">
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
          </div>
        </div>
      </div>
    </section>
  );
}
