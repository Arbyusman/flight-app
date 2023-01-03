import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUser();
    handleGetWishlist();
  }, []);

  const handleGetWishlist = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/wishlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setWishlist(data.data);
      });
  };

  const handleGetUser = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setUsers(data.data.users);
      });
  };

  return (
    <Layout>
      <div className="mt-10">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Wishlist</h1>
          </div>
        </div>

        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Ticket</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {wishlist.map((wishlist) => (
                <Table.Row key={wishlist.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{wishlist.User.username}</Table.Cell>
                  <Table.Cell>{wishlist.ticket_id}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
