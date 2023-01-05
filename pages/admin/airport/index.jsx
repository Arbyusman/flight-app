import Layout from "../../../components/admin/Layout";
import { Button, Modal, Table } from "flowbite-react";
import Link from "next/link";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";

export default function Airport() {
  const [airport, setAirport] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    handelGetAirport();
  }, []);

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
        console.log("data airport", data.data);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/airport/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      throw err;
    });

    handelGetAirport();
    setOpenDialog(false);
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
              <Table.HeadCell>City Code</Table.HeadCell>
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
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
