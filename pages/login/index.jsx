/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, Label, TextInput } from "flowbite-react";

export default function login() {
  const router = useRouter();

  const [token, setToken] = useState("");

  const [err, setErr] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");

    setToken(token);
  }, []);

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
      router.push("/admin");
      setLoginLoading(false);
    } else if (res.status === "OK" && res.data.role === "buyer") {
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } else {
      const errMessage = res.message;
      setErr(errMessage);
      setLoginLoading(false);
    }
  };

  if (token) {
    return (
      <section className="h-screen">
        <div className="w-full  h-full flex justify-center items-center">
          <div className="flex-row items-center text-center justify-center ">
            <h1 className="my-2">you are logged in</h1>
            <svg
              className="flex  justify-center items-center  w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </section>
    );
  } else {
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
              >
                <h3 className="text-xl text-center  font-medium text-gray-900 dark:text-white">
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
                  <a
                    href="register"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
