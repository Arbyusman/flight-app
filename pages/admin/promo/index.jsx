import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";

export default function Promo() {
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    handelGetPromo();
  }, []);

  const handelGetPromo = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/promo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setPromo(data.data);
        console.log("dataPromo", data);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    alert("Yakin ingin Menghapus Data?");
    fetch(`${process.env.API_ENDPOINT}api/v1/promo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      throw err;
    });

    handelGetPromo();
  };
  return (
    <Layout>
      <div className="mt-10">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Promo</h1>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3">
            <Link href="/admin/promo/create">
              <Button>
                <GoPlus className="mx-2" />
                Create New Promo
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="w-3/5">Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Code Promo</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Discount</Table.HeadCell>
              <Table.HeadCell>
                Action
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {promo.map((promo) => (
                <Table.Row key={promo.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img src={promo.photo} alt="img-promo" />
                  </Table.Cell>
                  <Table.Cell>{promo.name}</Table.Cell>
                  <Table.Cell>{promo.code}</Table.Cell>
                  <Table.Cell>{promo.description}</Table.Cell>
                  <Table.Cell>{promo.discount}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a href={`/admin/promo/edit/${promo.id}`} className="w-5 h-5  font-medium text-green-600 hover:underline ">
                        <FaEdit />
                      </a>
                      <a onClick={() => handleDelete(promo.id)} className="font-medium text-red-600 hover:underline ">
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
