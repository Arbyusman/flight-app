import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
//import ListPromo from "../../../components/admin/flight/listPromo"

export default function Flight() {
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    handelGetFlight();
  }, []);

  const handelGetFlight = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/flight`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        setFlight(data.data.data);
        console.log("data flight", data);
      });
  };

  return (
    <Layout>
      <div className="mt-10">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Flight</h1>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3">
            <Link href="/admin/flight/create">
              <Button>
                <GoPlus className="mx-2" />
                Create New Flight
              </Button>
            </Link>
          </div>

          {/* <div className="flex flex-wrap items-start justify-end -mb-3">
            <form>
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Search
                </button>
              </div>
            </form>
          </div> */}
        </div>
        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Plane</Table.HeadCell>
              <Table.HeadCell>From Airport</Table.HeadCell>
              <Table.HeadCell>To Airport</Table.HeadCell>
              <Table.HeadCell>Arrival Time</Table.HeadCell>
              <Table.HeadCell>Depature</Table.HeadCell>
              <Table.HeadCell className="w-20">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {flight.map((flight) => (
                <Table.Row
                  key={flight.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {flight.Plane.name}
                  </Table.Cell>
                  <Table.Cell>{flight.from.name}</Table.Cell>
                  <Table.Cell>{flight.to.name}</Table.Cell>
                  <Table.Cell>{flight.arrival_time}</Table.Cell>
                  <Table.Cell>{flight.depature}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a
                        href={`/admin/flight/edit/${flight.id}`}
                        className="w-5 h-5  font-medium text-green-600 hover:underline "
                      >
                        <FaEdit />
                      </a>
                      <a
                        href="/tables"
                        className="font-medium text-red-600 hover:underline gap-20 "
                      >
                        <FaTrashAlt />
                      </a>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
