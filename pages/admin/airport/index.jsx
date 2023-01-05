import Layout from "../../../components/admin/Layout";
import { Button, Modal, Table } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HiOutlineExclamationCircle } from "react-icons/hi";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";

export default function Airport() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [airport, setAirport] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handelGetAirport = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/airport`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setAirport(data.data);
      });
  };
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
        }
      });
    handelGetAirport();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.API_ENDPOINT}api/v1/airport/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch((err) => {
      throw err;
    });

    const data = await response.json();
    if (data.status === "OK") {
      handelGetAirport();
      setOpenDialog(false);
    }
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
                <Table.HeadCell>City Code</Table.HeadCell>
                <Table.HeadCell>City</Table.HeadCell>
                <Table.HeadCell>Country</Table.HeadCell>
                <Table.HeadCell className="w-20">Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {airport.length > 0 ? (
                  (airport.sort((a, b) => a.id - b.id),
                  airport.map((item) => (
                    <Table.Row
                      key={item.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </Table.Cell>
                      <Table.Cell>{item.city_code}</Table.Cell>
                      <Table.Cell>{item.city}</Table.Cell>
                      <Table.Cell>{item.country}</Table.Cell>
                      <Table.Cell>
                        <div className="flex justify-between">
                          <Link
                            href={`/admin/airport/edit/${item.id}`}
                            className="w-5 h-5  font-medium text-green-600 hover:underline "
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => setOpenDialog(true)}
                            type="button"
                            className="font-medium text-red-600 hover:underline gap-20 "
                          >
                            <FaTrashAlt />
                          </button>
                          <Modal
                            show={openDialog}
                            size="md"
                            popup={true}
                            onClose={() => setOpenDialog(false)}
                          >
                            <Modal.Header />
                            <Modal.Body>
                              <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                  Apakah anda yakin untuk menghapus item ini?
                                </h3>
                                <div className="flex justify-center gap-4">
                                  <Button
                                    color="failure"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    Ya, saya yakin
                                  </Button>
                                  <Button
                                    color="gray"
                                    onClick={() => setOpenDialog(false)}
                                  >
                                    Tidak, batalkan
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )))
                ) : (
                  <Table.Row></Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </Layout>
    );
  }
}
