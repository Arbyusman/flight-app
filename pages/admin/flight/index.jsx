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

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    alert("Yakin ingin Menghapus Data?");
    fetch(`${process.env.API_ENDPOINT}api/v1/flight/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      throw err;
    });

    handelGetFlight();
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
        </div>
        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Plane</Table.HeadCell>
              <Table.HeadCell>From Airport</Table.HeadCell>
              <Table.HeadCell>To Airport</Table.HeadCell>
              <Table.HeadCell>Arrival Time</Table.HeadCell>
              <Table.HeadCell>Arrival Date</Table.HeadCell>
              <Table.HeadCell>Departure Time</Table.HeadCell>
              <Table.HeadCell>Departure Date</Table.HeadCell>
              <Table.HeadCell className="w-20">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {flight.map((flight) => (
                <Table.Row key={flight.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{flight.Plane.name}</Table.Cell>
                  <Table.Cell>{flight.from.name}</Table.Cell>
                  <Table.Cell>{flight.to.name}</Table.Cell>
                  <Table.Cell>{flight.arrival_time}</Table.Cell>
                  <Table.Cell>{flight.arrival_date}</Table.Cell>
                  <Table.Cell>{flight.departure_time}</Table.Cell>
                  <Table.Cell>{flight.departure_date}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a href={`/admin/flight/edit/${flight.id}`} className="w-5 h-5  font-medium text-green-600 hover:underline ">
                        <FaEdit />
                      </a>
                      <a onClick={() => handleDelete(flight.id)} className="font-medium text-red-600 hover:underline gap-20 ">
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
