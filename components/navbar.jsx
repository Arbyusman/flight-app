import { useState } from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-100">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div
            className="items-center  hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col items-center py-2 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
              <a href="https://flowbite.com/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-6 mr-3 sm:h-9"
                  alt="Flowbite Logo"
                />
              </a>

              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-600 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-gray-700 md:p-0 dark:text-gray-600 md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Flights
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-600 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-gray-700 md:p-0 dark:text-gray-600 md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Promo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-600 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-gray-700 md:p-0 dark:text-gray-600 md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Our App
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-600 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-gray-700 md:p-0 dark:text-gray-600 md:dark:hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-900 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Why Us
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-600 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-600">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          
        </div>
      </nav>
    </div>
  );
}
