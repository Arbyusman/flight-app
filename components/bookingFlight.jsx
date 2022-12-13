import React, { useState } from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";

BsPerson;

export default function BookingFlight() {
  return (
    <div className="justify-center items-center flex">
      <div className="lg:flex mt-5 gap-3 w-full md:w-11/12 lg:w-9/12 flex-row ">
        {/* contact information */}

        <div className=" w-full lg:w-8/12 ">
          <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-between shadow-md px-7 py-5">
            <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
              Contact Information
            </h1>
          </div>
          <hr />

          {/* form contact information */}
          <div className="flex justify-center  ">
            <div className="w-full gap-5  bg-white   shadow-md p-7">
              <div className="lg:flex w-full lg:justify-start lg:items-center lg:gap-10">
                <div className="lg:w-52">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                  >
                    Title
                  </label>

                  <select
                    id="title"
                    label="Select"
                    color="gray"
                    className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none"
                    required
                  >
                    <option disabled hidden>
                      Select
                    </option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                  </select>
                </div>
                <div className="lg:w-52">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                    required
                  />
                </div>
              </div>
              <div className="lg:flex w-full lg:justify-start lg:gap-10 lg:mt-2 lg:items-center">
                <div className="lg:w-52">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                    required
                  />
                </div>
                <div className="lg:w-52">
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                    required
                  >
                    Phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Information */}
          <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-between shadow-md p-7">
            <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
              Traveler Information
            </h1>
          </div>
          <hr />
          <div className="flex justify-center  ">
            <div className="w-full gap-5  bg-white    shadow-md p-7">
              {/* card traveler */}
              <div className="rounded-md shadow-lg bg-slate-50 m-2">
                <div className="w-full  bg-white rounded-t-md flex-row md:flex justify-start items-center gap-3 shadow-md p-7">
                  <BsPerson className="text-2xl font-bold  text-gray-700 " />
                  <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700">
                    Traveler 1
                  </h1>
                </div>

                {/* form contact information */}
                <div className="flex justify-center  ">
                  <div className="w-full gap-5  bg-white border-t-2   shadow-md p-7">
                    <div className="lg:flex w-full lg:justify-start lg:items-center lg:gap-10">
                      <div className="lg:w-52">
                        <label
                          for="title"
                          class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                        >
                          Title
                        </label>

                        <select
                          id="title"
                          label="Select"
                          color="gray"
                          className="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none"
                          required
                        >
                          <option disabled hidden>
                            Select
                          </option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                        </select>
                      </div>
                      <div className="lg:w-52">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                          required
                        />
                      </div>
                    </div>
                    <div className="lg:flex w-full lg:justify-start lg:gap-10 lg:mt-2 lg:items-center">
                      <div className="lg:w-52">
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none "
                          required
                        />
                      </div>
                      <div className="lg:w-52">
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
                          required
                        >
                          Phone
                        </label>
                        <input
                          type="phone"
                          id="phone"
                          class="block w-full p-2 text-gray-800   border-0 border-gray-300 border-b-2  text-base  focus:bg-gray-50 focus:border-b-2 focus:border-0 focus:border-gray-600 focus:ring-0 focus:shadow-none focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* tiket Detail */}
        <div className="w-full  md:w-full lg:w-4/12">
          <div className="w-full md:justify-between ">
            <div className=" items-center justify-between flex-row shadow-md  bg-white rounded-sm text-gray-600 tracking-wide antialiased mb-2">
              <div className="w-full   flex-row md:flex justify-between  px-7  py-5">
                <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                  Flight
                </h1>
              </div>
              <hr />
              <div className="p-7">
                <div className="font-semibold gap-5 my-2 text-base flex justify-between">
                  <div className="flex items-center gap-2 ">
                    <p>Depart</p>
                    <p>KDI</p>
                    <IoAirplaneOutline />
                    <p>UPG</p>
                  </div>
                  <p>RP 678.000</p>
                </div>
                <div className="flex justify-between text-sm font-thin my-1">
                  <p>Adult x 1</p>
                  <p>RP 678.000</p>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold tracking-wider my-2">
                  <p>total Price</p>
                  <p>RP 678.000</p>
                </div>
              </div>
            </div>

            {/* Price Detail */}
            <div className=" items-center justify-between flex-row shadow-md  bg-white rounded-md text-gray-600 tracking-wide antialiased mb-2">
              <div className="w-full   flex-row md:flex justify-between  px-7 py-5">
                <h1 className="text-lg font-bold antialiased tracking-wider text-gray-700 ">
                  Price Detail
                </h1>
              </div>
              <hr />
              <div className="p-7">
                <div className="font-semibold gap-5 my-2 text-base flex justify-between">
                  <div className="flex items-center gap-2 ">
                    <p>Depart</p>
                    <p>KDI</p>
                    <IoAirplaneOutline />
                    <p>UPG</p>
                  </div>
                  <p>RP 678.000</p>
                </div>
                <div className="flex justify-between text-sm font-thin my-1">
                  <p>Adult x 1</p>
                  <p>RP 678.000</p>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold tracking-wider my-2">
                  <p>total Price</p>
                  <p>RP 678.000</p>
                </div>
              </div>
            </div>
            <a href="confirm/book">
              <button
                type="button"
                class="focus:outline-none lg:w-full mt-2 text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-semibold antialiased tracking-wide rounded-md text-md  px-5 py-2.5 mr-2 mb-2 "
              >
                Continue Booking
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
