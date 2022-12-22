import { Fragment, useState, useEffect } from "react";
import { Tabs, Button } from "flowbite-react";
import { Combobox, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const cities = [
  "Jakarta",
  "Makassar",
  "Padang",
  "Surabaya",
  "Denpasar",
  "Manado",
];

const categories = [
  { category: "Economy Class" },
  { category: "Business Class" },
];

const SearchFlightForm = () => {
  const [selectedCategories, setSelectedCategories] = useState(categories[0]);

  const [airport, setAirport] = useState([]);

  const [departureNative, setDepartureNative] = useState("");
  const onDepartureNativeChange = (e) => {
    console.log("onDepartureNativeChange: ", e.target.value);
    setDepartureNative(e.target.value);
  };

  const [arrivalNative, setArrivalNative] = useState("");
  const onArrivalNativeChange = (e) => {
    console.log("onArrivalNativeChange: ", e.target.value);
    setArrivalNative(e.target.value);
  };

  useEffect(() => {
    handelGetAirport();

    if (fromSelectedCity !== toSelectedCity) {
    }
  }, []);

  const handelGetAirport = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/airport`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("data airport", data.data);
        setAirport(data.data);
      });
  };
  const [fromSelectedCity, setFromSelectedCity] = useState("");
  const [toSelectedCity, setToSelectedCity] = useState("");
  const [query, setQuery] = useState("");

  const filteredCity =
    query === ""
      ? airport
      : airport.filter((city) => {
          return city.city.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div>
      <div className="mx-8 my-6 md:rounded-2xl rounded-xl bg-white p-6 shadow-xl border border-gray-300">
        <Tabs.Group
          aria-label="Tabs with underline"
          style="underline"
          className="border-none"
        >
          <Tabs.Item active={true} title="One-Way">
            <form action="/search" method="GET">
              <div className="flex justify-between flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2">
                <div
                  id="from"
                  className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
                >
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Dari
                  </label>
                  <Combobox
                    value={fromSelectedCity}
                    onChange={setFromSelectedCity}
                  >
                    <div className="relative mt-1 w-full">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCity.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCity.map((city) => (
                              <Combobox.Option
                                key={city.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={`${city.city} ( ${city.city_code})`}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <p className="font-semibold antialiased tracking-normal">
                                        {city.city}
                                        {`, ${city.country}`}
                                      </p>

                                      <p className="text-xs tracking-normal antialiased">{city.name}</p>
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <div
                  id="to"
                  className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
                >
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Ke
                  </label>
                  <Combobox value={toSelectedCity} onChange={setToSelectedCity}>
                    <div className="relative mt-1 w-full">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCity.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCity.map((city) => (
                              <Combobox.Option
                                key={city.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={`${city.city} ( ${city.city_code})`}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <p className="font-semibold antialiased tracking-normal">
                                        {city.city}
                                        {`, ${city.country}`}
                                      </p>

                                      <p className="text-xs tracking-normal antialiased">{city.name}</p>
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <div className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2">
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Tanggal Keberangkatan
                  </label>
                  <div className="relative mt-1 w-full">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                      <input
                        type="date"
                        value={departureNative}
                        onChange={onDepartureNativeChange}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                      ></input>
                    </div>
                  </div>
                </div>
                <div
                  id="category"
                  className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
                >
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Kategori
                  </label>
                  <Listbox
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                  >
                    <div className="relative mt-1 w-full">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedCategories.category}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {categories.map((category, categoryIdx) => (
                            <Listbox.Option
                              key={categoryIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={category}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {category.category}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div>
                  <Button type="submit" className="h-full">
                    Cari
                  </Button>
                </div>
              </div>
            </form>
          </Tabs.Item>
          <Tabs.Item title="Roundtrip">
            <form>
              <div className="flex justify-between flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2">
                <div
                  id="from"
                  className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
                >
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Dari
                  </label>
                  <Combobox
                    value={fromSelectedCity}
                    onChange={setFromSelectedCity}
                  >
                    <div className="relative mt-1 w-full">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCity.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCity.map((city) => (
                              <Combobox.Option
                                key={city.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={`${city.city} (${city.city_code})`}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                     <p className="font-semibold antialiased tracking-normal">
                                        {city.city}
                                        {`, ${city.country}`}
                                      </p>

                                      <p className="text-xs tracking-normal antialiased">{city.name}</p>
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <div
                  id="to"
                  className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
                >
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Ke
                  </label>
                  <Combobox value={toSelectedCity} onChange={setToSelectedCity}>
                    <div className="relative mt-1 w-full">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCity.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCity.map((city) => (
                              <Combobox.Option
                                key={city}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={`${city.city} (${city.city_code})`}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                     <p className="font-semibold antialiased tracking-normal">
                                        {city.city}
                                        {`, ${city.country}`}
                                      </p>

                                      <p className="text-xs tracking-normal antialiased">{city.name}</p>
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <div className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2">
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Tanggal Keberangkatan
                  </label>
                  <div className="relative mt-1 w-full">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                      <input
                        type="date"
                        value={departureNative}
                        onChange={onDepartureNativeChange}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2">
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Tanggal Kembali
                  </label>
                  <div className="relative mt-1 w-full">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                      <input
                        type="date"
                        value={arrivalNative}
                        onChange={onArrivalNativeChange}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0"
                      ></input>
                    </div>
                  </div>
                </div>
                <div
                  id="category"
                  className="relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2"
                >
                  <label className="text-sm w-full font-bold mb-1 text-gray-500">
                    Kategori
                  </label>
                  <Listbox
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                  >
                    <div className="relative mt-1 w-full">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedCategories.category}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {categories.map((category, categoryIdx) => (
                            <Listbox.Option
                              key={categoryIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={category}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {category.category}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div>
                  <Button type="submit" className="h-full">
                    Cari
                  </Button>
                </div>
              </div>
            </form>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default SearchFlightForm;
