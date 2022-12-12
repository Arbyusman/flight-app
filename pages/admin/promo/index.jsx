import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
//import ListPromo from "../../../components/admin/promo/listPromo"

export default function Promo() {
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetch(`https://beckend-takeoff-production.up.railway.app/api/v1/promo`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        setPromo(data.data);
        console.log("datahere", data);
      });
  }, []);
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
        <div className="mt-10">
          {promo.map((promo) => (
            <Table key={promo.id} hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Discount</Table.HeadCell>
                <Table.HeadCell>
                  Action
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{promo.photo}</Table.Cell>
                  <Table.Cell>{promo.name}</Table.Cell>
                  <Table.Cell>{promo.description}</Table.Cell>
                  <Table.Cell>{promo.discount}</Table.Cell>
                  <Table.Cell>
                    <div>
                      <a href="/admin/createPromo" className="w-5 h-5 mx-5 font-medium text-green-600 hover:underline ">
                        <FaEdit />
                      </a>
                      <a href="/tables" className="mx-5 font-medium text-red-600 hover:underline ">
                        <FaTrashAlt />
                      </a>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          ))}
        </div>
      </div>
    </Layout>
  );
}
