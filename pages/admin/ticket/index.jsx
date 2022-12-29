import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";
import { useRouter } from "next/router";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
import Image from "next/image";
//import ListPromo from "../../../components/admin/ticket/listPromo"

export default function Ticket() {
  const [ticket, setTicket] = useState([]);
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    getListTicket();
    handelGetFlight();
  }, []);

  const handelGetFlight = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/flight`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        setFlight(data.data.data);
        console.log("data flight", data.data);
      });
  };

  const getListTicket = () => {
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        setTicket(data.data);
        console.log("datahere", data);
      });
  };

  const handleDelete = (id) => {
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      throw err;
    });

    alert("Data berhasil Di hapus");

    getListTicket();
  };

  return (
    <Layout>
      <div className="mt-10">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Ticket</h1>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3">
            <Link href="/admin/ticket/create">
              <Button>
                <GoPlus className="mx-2" />
                Create New Ticket
              </Button>
            </Link>
          </div>
        </div>

        {/* <form>
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form> */}

        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Flight</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Cabin Baggage</Table.HeadCell>
              <Table.HeadCell>Baggage</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell className="w-20">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {ticket.map((ticket) => (
                <Table.Row key={ticket.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img src={ticket.photo} alt="img-photo" />
                  </Table.Cell>
                  <Table.Cell>{ticket.flight_id}</Table.Cell>
                  <Table.Cell>{ticket.type}</Table.Cell>
                  <Table.Cell>Rp. {ticket.price}</Table.Cell>
                  <Table.Cell>{ticket.cabin_baggage} KG</Table.Cell>
                  <Table.Cell>{ticket.baggage} KG</Table.Cell>
                  <Table.Cell>{ticket.desc}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a href={`/admin/ticket/edit/${ticket.id}`} className="w-5 h-5  font-medium text-green-600 hover:underline ">
                        <FaEdit />
                      </a>
                      <button onClick={() => handleDelete(ticket.id)} type="button" className="font-medium text-red-600 hover:underline gap-20 ">
                        <FaTrashAlt />
                      </button>
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
