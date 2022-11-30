
const Modal = ({ openModalLogin, closeModalLogin }) => {


  if (!openModalLogin) return null;
  return (
    <div
      id="authentication-modal"
      tabindex="-1"
      className="flex justify-center items-center backdrop-brightness-50  fixed p-4 w-full  inset-0 h-modal md:h-full"
    >
      <div className="relative w-full max-w-md h-full md:h-auto">
        <div className="relative bg-gray-200 rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:border-slate-700 hover:border-2 hover:text-gray-900 rounded-xl text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-toggle="authentication-modal"
            onClick={closeModalLogin}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="py-6 px-6  lg:px-8">
            <div className="mb-6 mt-2">
              <h3 className="text-xl mb-2 font-medium justify-center text-center text-gray-900">
                Sign in
              </h3>
              <h4 className="font-medium text-md justify-center text-center text-gray-900">
                TakeOff flight
              </h4>
            </div>
            <form className="" action="#">
              <div className="relative my-2">
                <input
                  type="Email"
                  id="floating_filled_email"
                  className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white  border-1 border-b-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_filled_email"
                  className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email
                </label>
              </div>
              <div className="relative mt-4">
                <input
                  type="password"
                  id="floating_filled_password"
                  className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-white  border-1 border-b-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_filled_password"
                  className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
              </div>

              {/* <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300  "
                      required
                    />
                  </div>
                  <label
                    for="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div> */}
              <button
                type="submit"
                className="w-full mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                Login to your account
              </button>
              <div className="text-md font-medium text-center text-gray-700 ">
                Not registered?{" "}
                <div className="text-sm">
                  <a href="register" className="text-blue-600 hover:underline ">
                    Create account
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
