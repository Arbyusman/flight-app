const SearchFlightForm = () => {
  return (
    <div>
      <div className="flex items-center py-2 px-4 text-blue-600">
        <div className="flex items-center">
          <p>Roundtrip</p>
          <svg
            className="mx-2 w-4 h-4 text-blue-600 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </svg>
        </div>
        <div className="flex items-center">
          <p>1 traveler</p>
          <svg
            className="mx-2 w-4 h-4 text-blue-600 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </svg>
        </div>
        <div className="flex items-center">
          <p>Economy</p>
          <svg
            className="mx-2 w-4 h-4 text-blue-600 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </svg>
        </div>
        <div className="flex items-center">
          <p>Any airline</p>
          <svg
            className="mx-2 w-4 h-4 text-blue-600 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </svg>
        </div>
        <div className="flex items-center">
          <p>More options</p>
          <svg
            className="mx-2 w-4 h-4 text-blue-600 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </svg>
        </div>
      </div>
      <div className="flex items-center py-2 px-4">
        <div className="flex items-center w-72 h-12 rounded-xl border border-gray-700">
          <svg
            className="mx-2 w-8 h-8 text-gray-700 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path
                fillRule="evenodd"
                d="M5 9a7 7 0 1114 0c0 5.25-7 13-7 13S5 14.25 5 9zm4.5 0a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
                clipRule="evenodd"
              />
            </svg>
          </svg>
          <div className="text-gray-700">
            <p className="text-xs">Flying from</p>
            <p className="text-lg">Tokyo(NRT - Narita Intl.)</p>
          </div>
        </div>
        <svg
          className="mx-2 w-8 h-8 text-blue-600 fill-current"
          aria-hidden="true"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
        >
          <svg>
            <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
          </svg>
        </svg>
        <div className="flex items-center w-72 h-12 rounded-xl border border-gray-700">
          <svg
            className="mx-2 w-8 h-8 text-gray-700 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path
                fillRule="evenodd"
                d="M5 9a7 7 0 1114 0c0 5.25-7 13-7 13S5 14.25 5 9zm4.5 0a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
                clipRule="evenodd"
              />
            </svg>
          </svg>
          <div className="text-gray-700">
            <p className="text-xs">Flying to</p>
            <p className="text-lg">Zurich(ZRH)</p>
          </div>
        </div>
        <div className="flex items-center mx-2 w-36 h-12 rounded-xl border border-gray-700">
          <svg
            className="mx-2 w-8 h-8 text-gray-700 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path
                fillRule="evenodd"
                d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-1.99 2L3 19a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 5v11H5V8h14zm-7 2H7v5h5v-5z"
                clipRule="evenodd"
              />
            </svg>
          </svg>
          <div className="text-gray-700">
            <p className="text-xs">Departing</p>
            <p className="text-lg">Feb 12</p>
          </div>
        </div>
        <div className="flex items-center w-36 h-12 rounded-xl border border-gray-700">
          <svg
            className="mx-2 w-8 h-8 text-gray-700 fill-current"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <svg>
              <path
                fillRule="evenodd"
                d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 00-1.99 2L3 19a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 5v11H5V8h14zm-7 2H7v5h5v-5z"
                clipRule="evenodd"
              />
            </svg>
          </svg>
          <div className="text-gray-700">
            <p className="text-xs">Returning</p>
            <p className="text-lg">Feb 13</p>
          </div>
        </div>
        <button className="mx-2 bg-blue-600 rounded-xl drop-shadow">
          <p className="p-3 text-lg text-white">Search</p>
        </button>
      </div>
    </div>
  );
};

export default SearchFlightForm;
