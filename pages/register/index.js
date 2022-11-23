import React from "react";

export default function Home() {
  return (
    <div className="font-sans antialiased bg-grey">
      <div className="w-full bg-green-700 fixed shadow z-1">
        <div className="container mx-auto">
          <div className="w-full flex justify-between items-center py-4 px-8">
            <div className="text-center text-white font-bold">Your Company</div>
            <div className="items-center hidden sm:flex">
              <a
                href="#"
                className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
              >
                Link 1
              </a>
              <a
                href="#"
                className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
              >
                Link 2
              </a>
              <a
                href="#"
                className="bg-green-dark hover:bg-green-darker rounded-full text-white no-underline mx-2 px-4 py-2"
              >
                Link 3
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-grey-lightest" style={{ paddingTop: "4rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Register for a free account
            </div>
            <div className="py-4 px-8">
              <div className="flex mb-4">
                <div className="w-1/2 mr-1">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="first_name"
                    type="text"
                    placeholder="Your first name"
                  />
                </div>
                <div className="w-1/2 ml-1">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="last_name"
                    type="text"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="email"
                  type="email"
                  placeholder="Your email address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="password"
                  type="password"
                  placeholder="Your secure password"
                />
                <p className="text-grey text-xs mt-1">At least 6 characters</p>
              </div>
              <div className="flex items-center justify-between mt-8">
                <button
                  className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <p className="text-center my-4">
            <a
              href="#"
              className="text-grey-dark text-sm no-underline hover:text-grey-darker"
            >
              I already have an account
            </a>
          </p>
        </div>
      </div>
      <footer className="w-full bg-grey-lighter py-8">
        <div className="container mx-auto text-center px-8">
          <p className="text-grey-dark mb-2 text-sm">
            This is a product of <span className="font-bold">Your Company</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
