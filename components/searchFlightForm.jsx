import { Fragment, useState, useEffect } from "react";
import { Tabs, Button, Modal, Alert } from "flowbite-react";
import { Combobox, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Router from "next/router";

const categories = [{ category: "Economi" }, { category: "Business" }];

const SearchFlightForm = () => {
  const [selectedCategories, setSelectedCategories] = useState("");
  const [fromSelectedCity, setFromSelectedCity] = useState("");
  const [toSelectedCity, setToSelectedCity] = useState("");
  const [query, setQuery] = useState("");
  const [airport, setAirport] = useState([]);

  const [openModalErrorDestination, setOpenModalErrorDestination] =
    useState(false);
  const [openModalErrorSelectDateReturn, setOpenModalErrorSelectDateReturn] =
    useState(false);
  const [
    openModalErrorSelectDateDeparture,
    setOpenModalErrorSelectDateDeparture,
  ] = useState(false);
  const [openModalErrorSelectDeparture, setOpenModalErrorSelectDeparture] =
    useState(false);
  const [openModalErrorSelectDestination, setOpenModalErrorSelectDestination] =
    useState(false);
  const [openModalErrorSelectCategory, setOpenModalErrorSelectCategory] =
    useState(false);

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

  const handelGetAirport = async () => {
    await fetch(`${process.env.API_ENDPOINT}api/v1/airport`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        setAirport(data.data);
      });

    console.log(airport);
  };

  useEffect(() => {
    handelGetAirport();
  }, []);

  const handleSearchOneWayFlight = () => {
    if (!fromSelectedCity) {
      setOpenModalErrorSelectDeparture(true);
      setTimeout(() => {
        setOpenModalErrorSelectDeparture(false);
      }, 1500);
      return;
    } else if (!toSelectedCity) {
      setOpenModalErrorSelectDestination(true);
      setTimeout(() => {
        setOpenModalErrorSelectDestination(false);
      }, 1500);
      return;
    } else if (!departureNative) {
      setOpenModalErrorSelectDateDeparture(true);
      setTimeout(() => {
        setOpenModalErrorSelectDateDeparture(false);
      }, 1500);
      return;
    } else if (!selectedCategories) {
      setOpenModalErrorSelectCategory(true);
      setTimeout(() => {
        setOpenModalErrorSelectCategory(false);
      }, 1500);
      return;
    } else if (fromSelectedCity === toSelectedCity) {
      setOpenModalErrorDestination(true);
      setTimeout(() => {
        setOpenModalErrorDestination(false);
      }, 1500);
      return;
    } else {
      Router.push({
        pathname: "/search",
        query: {
          from: fromSelectedCity,
          to: toSelectedCity,
          depart: departureNative,
          category: selectedCategories.category,
        },
      });
    }
  };

  const handleSearchRoundtripFlight = () => {
    if (!fromSelectedCity) {
      setOpenModalErrorSelectDeparture(true);
      setTimeout(() => {
        setOpenModalErrorSelectDeparture(false);
      }, 1500);
      return;
    } else if (!toSelectedCity) {
      setOpenModalErrorSelectDestination(true);
      setTimeout(() => {
        setOpenModalErrorSelectDestination(false);
      }, 1500);
      return;
    } else if (!departureNative) {
      setOpenModalErrorSelectDateDeparture(true);
      setTimeout(() => {
        setOpenModalErrorSelectDateDeparture(false);
      }, 1500);
      return;
    } else if (!selectedCategories) {
      setOpenModalErrorSelectCategory(true);
      setTimeout(() => {
        setOpenModalErrorSelectCategory(false);
      }, 1500);
      return;
    } else if (!arrivalNative) {
      setOpenModalErrorSelectDateReturn(true);
      setTimeout(() => {
        setOpenModalErrorSelectDateReturn(false);
      }, 1500);
      return;
    } else if (fromSelectedCity === toSelectedCity) {
      setOpenModalErrorDestination(true);
      setTimeout(() => {
        setOpenModalErrorDestination(false);
      }, 1500);
      return;
    }

    Router.push({
      pathname: "/search",
      query: {
        from: fromSelectedCity,
        to: toSelectedCity,
        depart: departureNative,
        arrival: arrivalNative,
        category: selectedCategories.category,
      },
    });
  };

  const filteredCity =
    query === ""
      ? airport
      : airport.filter((city) => {
          return city.city.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div>
      <Modal
        show={openModalErrorSelectCategory}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert color="warning" className="justify-center items-center">
          <span>Please select Category</span>
        </Alert>
      </Modal>

      <Modal
        show={openModalErrorSelectDeparture}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert color="warning" className="justify-center items-center">
          <span>Please select departure airport</span>
        </Alert>
      </Modal>

      <Modal
        show={openModalErrorSelectDestination}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert color="warning" className="justify-center items-center">
          <span>Please select Destination airport</span>
        </Alert>
      </Modal>
      <Modal
        show={openModalErrorSelectDateDeparture}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert color="warning" className="justify-center items-center">
          <span>Please Choose a departure date</span>
        </Alert>
      </Modal>
      <Modal
        show={openModalErrorSelectDateReturn}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert color="warning" className="justify-center items-center">
          <span>Please Choose a return date</span>
        </Alert>
      </Modal>
      <Modal
        show={openModalErrorDestination}
        size="sm"
        popup={true}
        position={"top-center"}
      >
        <Alert
          color="warning"
          className="justify-center items-center text-center"
        >
          <span>the place of departure and return cannot be the same</span>
        </Alert>
      </Modal>

      <div className="mx-8 my-6 md:rounded-2xl rounded-xl bg-white p-6 shadow-xl border border-gray-300">
        <Tabs.Group
          aria-label="Tabs with underline"
          style="underline"
          className="border-none"
        >
          <Tabs.Item active={true} title="One-Way">
            <div action="" method="">
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
                                value={`${city.city}`}
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

                                      <p className="text-xs tracking-normal antialiased">
                                        {city.name}
                                      </p>
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
                                value={`${city.city}`}
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

                                      <p className="text-xs tracking-normal antialiased">
                                        {city.name}
                                      </p>
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
                        min={new Date().toISOString().split("T")[0]}
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
                  <Button
                    type="submit"
                    className="h-full"
                    onClick={handleSearchOneWayFlight}
                  >
                    Cari
                  </Button>
                </div>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Roundtrip">
            <div>
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
                          required={true}
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
                                value={`${city.city}`}
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

                                      <p className="text-xs tracking-normal antialiased">
                                        {city.name}
                                      </p>
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
                                value={`${city.city}`}
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

                                      <p className="text-xs tracking-normal antialiased">
                                        {city.name}
                                      </p>
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
                        min={new Date().toISOString().split("T")[0]}
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
                        min={new Date().toISOString().split("T")[0]}
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
                  <Button
                    type="submit"
                    className="h-full"
                    onClick={handleSearchRoundtripFlight}
                  >
                    Cari
                  </Button>
                </div>
              </div>
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default SearchFlightForm;
