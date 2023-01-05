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
  const router = useRouter();
  const [ticket, setTicket] = useState([]);
  const [flight, setFlight] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");

    fetch(`${process.env.API_ENDPOINT}api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.message === "UNAUTHORIZED" || data.data.role !== "admin") {
          router.push("/");
        } else {
          setLoading(false);
          handelGetFlight();
          getListTicket();
        }
      });
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

  if (loading) {
    return (
      <section className="h-screen">
        <div className="w-full  h-full flex justify-center items-center">
          <svg
            className="flex  justify-center items-center mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </section>
    );
  } else {
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
                  <Table.Row
                    key={ticket.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {/* <figure className="max-w-md ">
                      <Image className="w-12 flex " src={ticket.photo} alt="logo penerbangan" width={50} height={50}></Image>
                      <figcaption className="mt-2 text-xs md:text-center text-gray-500 dark:text-gray-400">{ticket.Flight.Plane.name}</figcaption>
                    </figure> */}
                      {ticket.photo && (
                        <Image
                          src={ticket.photo}
                          alt=""
                          height={900}
                          width={900}
                          layout="responsive"
                        />
                      )}
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
                        <a
                          href={`/admin/ticket/edit/${ticket.id}`}
                          className="w-5 h-5  font-medium text-green-600 hover:underline "
                        >
                          <FaEdit />
                        </a>
                        <button
                          onClick={() => handleDelete(ticket.id)}
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
}
