/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");

    setToken(token);
  }, []);

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.API_ENDPOINT}api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => {
      throw err;
    });
    const res = await response.json();
    console.log(data);

    console.log("data register", res.status);

    if (res.status === "OK") {
      alert("Congratulation!! , Your accounnt has been Regitered");
      router.push("login");
    }
  };

  async function handelRegister() {}
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
      <div>
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
                <div
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-6 space-y-4 md:space-y-6 sm:p-8"
                >
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Create and account
                  </h1>
                  <form
                    method="POST"
                    className="space-y-4 md:space-y-6"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Your username
                      </label>
                      <input
                        type="username"
                        name="username"
                        id="username"
                        className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  "
                        placeholder="Mega Watt"
                        {...register("username", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      {errors.password &&
                        errors.password.type === "minLength" && (
                          <span className="text-xs text-red-600">
                            Username should be at-least 10 characters.
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        {" "}
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  "
                        placeholder="name@company.com"
                        // onChange={(e) => setEmail(e.target.value)}
                        {...register("email", {
                          required: true,
                          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        })}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <span className="text-xs text-red-600">
                          Email is required.
                        </span>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <span className="text-xs text-red-600">
                          Email is not valid.
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border sm:text-sm rounded-lg  block w-full p-2.5  "
                        ref={register("password", {
                          required: true,
                          minLength: 8,
                        })}
                      />
                      {errors.password &&
                        errors.password.type === "required" && (
                          <span className="text-xs text-red-600">
                            Password is required.
                          </span>
                        )}
                      {errors.password &&
                        errors.password.type === "minLength" && (
                          <span className="text-xs text-red-600">
                            Password should be at-least 8 characters.
                          </span>
                        )}
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{" "}
                          <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <center>
                      <button
                        // onClick={handelRegister}
                        type="submit"
                        name="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-20  py-3.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                      >
                        Create an account
                      </button>
                    </center>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        href="login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
