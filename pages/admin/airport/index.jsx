import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";
import { useRouter } from "next/router";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";

export default function Airport() {
  const [airport, setAirport] = useState([]);

  const handelGetAirport = () => {
    const token = localStorage.getItem("token");
    fetch(`https://beckend-takeoff-production.up.railway.app/api/v1/airport`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setAirport(data.data);
        console.log("data airport", data.data);
      });
  };
  useEffect(() => {
    handelGetAirport();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(
      `https://beckend-takeoff-production.up.railway.app/api/v1/ticket/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch((err) => {
      throw err;
    });

    getListTicket();
  };

  return (
    <Layout>
      <div className="mt-10">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Airport</h1>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3">
            <Link href="/admin/airport/create">
              <Button>
                <GoPlus className="mx-2" />
                Create New Airport
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Airport</Table.HeadCell>
              <Table.HeadCell>City</Table.HeadCell>
              <Table.HeadCell>Country</Table.HeadCell>
              <Table.HeadCell className="w-20">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {airport.map((item) => (
                <Table.Row
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>{item.city}</Table.Cell>
                  <Table.Cell>{item.country}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a
                        href={`/admin/airport/edit/${item.id}`}
                        className="w-5 h-5  font-medium text-green-600 hover:underline "
                      >
                        <FaEdit />
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        type="button"
                        className="font-medium text-red-600 hover:underline gap-20 "
                      >
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