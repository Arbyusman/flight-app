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
    handelGetFlight();
    getListTicket();
  }, []);

  const handelGetFlight = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/flight`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setFlight(data.data);
      });
  };

  const getListTicket = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setTicket(data.data);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    alert("Yakin ingin Menghapus Data?");
    fetch(`${process.env.API_ENDPOINT}api/v1/ticket/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      throw err;
    });

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

        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>From</Table.HeadCell>
              <Table.HeadCell>To</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Cabbin Baggage</Table.HeadCell>
              <Table.HeadCell>Baggage</Table.HeadCell>
              <Table.HeadCell>Departure</Table.HeadCell>
              <Table.HeadCell>Arrival</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell className="w-20">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {ticket.map((ticket) => (
                <Table.Row key={ticket.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {/* <figure className="max-w-md ">
                      <Image className="w-12 flex " src={ticket.photo} alt="logo penerbangan" width={50} height={50}></Image>
                      <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">{ticket.Flight.Plane.name}</figcaption>
                    </figure> */}
                    {ticket.photo && <Image src={ticket.photo} alt="" height={900} width={900} layout="responsive" />}
                  </Table.Cell>
                  <Table.Cell>{ticket.Flight.from.name}</Table.Cell>
                  <Table.Cell>{ticket.Flight.to.name}</Table.Cell>
                  <Table.Cell>{ticket.type}</Table.Cell>
                  <Table.Cell>Rp. {ticket.price}</Table.Cell>
                  <Table.Cell>{ticket.cabin_baggage} KG</Table.Cell>
                  <Table.Cell>{ticket.baggage} KG</Table.Cell>
                  <Table.Cell>{ticket.Flight.departure_date}</Table.Cell>
                  <Table.Cell>{ticket.Flight.arrival_date} </Table.Cell>
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
