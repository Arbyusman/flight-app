const Profile = ({ openProfile }) => {

  return (
    <form action="#" method="POST">
      <div className="overflow-hidden  sm:rounded-md ">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid  gap-6">
            <div className="col-span-3 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="col-span-3 ">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="email"
                className="mt-1 block w-full    border-gray-300 border-b-2 border-t-0 border-x-0 focus:ring-0  focus:border-gray-500 "
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="address-level2"
                className="mt-1 w-full   border-gray-300 border-b-2 border-t-0 border-x-0 focus:ring-0  focus:border-gray-500"
              />
            </div>
            <div className="col-span-10 sm:col-span-6 lg:col-span-3">
              <label
                htmlFor="no-handphone"
                className="block  text-sm font-medium text-gray-700"
              >
                Nomor Handphone
              </label>
              <input
                type="text"
                name="no-handphone"
                id="no-handphone"
                autoComplete="address-level2"
                className="mt-1 w-full   border-gray-300 border-b-2 border-t-0 border-x-0 focus:ring-0  focus:border-gray-500"
              />
            </div>
            <div className="col-span-10 sm:col-span-6 lg:col-span-3">
              <label
                htmlFor="no-handphone"
                className="block  text-sm font-medium text-gray-700"
              >
                Jenis Kelamin
              </label>
              <input
                type="text"
                name="no-handphone"
                id="no-handphone"
                autoComplete="address-level2"
                className="mt-1 w-full border-gray-300  border-b-2 border-t-0 border-x-0 focus:ring-0 focus:border-gray-500 "
              />
            </div>
            <div className="col-span-10 sm:col-span-6 lg:col-span-3">
              <label
                htmlFor="agama"
                className="block  text-sm font-medium text-gray-700"
              >
                Agama
              </label>
              <input
                type="text"
                name="agama"
                id="agama"
                autoComplete="address-level2"
                className="mt-1 w-full border-gray-300  border-b-2 border-t-0 border-x-0 focus:ring-0 focus:border-gray-500 "
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat
              </label>
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="mt-1 block  w-full    border-gray-300 border-b-2 border-t-0 border-x-0 focus:ring-0  focus:border-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
