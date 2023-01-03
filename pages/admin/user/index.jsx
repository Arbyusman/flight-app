import Layout from "../../../components/admin/Layout";
import { Button } from "flowbite-react";
import Link from "next/link";
import { Table } from "flowbite-react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
//import ListPromo from "../../../components/admin/promo/listPromo"

export default function Promo() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUser();
  }, []);

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

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    alert("Yakin ingin Menghapus Data?");
    fetch(`${process.env.API_ENDPOINT}api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      throw err;
    });

    handleGetUser();
  };

  return (
    <Layout>
      <div className="mt-10">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Users</h1>
          </div>

          <div className="flex flex-wrap items-start justify-end -mb-3"></div>
        </div>
        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="w-3/5">Image</Table.HeadCell>
              <Table.HeadCell>First Name</Table.HeadCell>
              <Table.HeadCell>Last Name</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>
                Action
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((users) => (
                <Table.Row key={users.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {users.photo === null ? (
                    <Table.Cell>Tidak ada photo</Table.Cell>
                  ) : (
                    <Table.Cell>
                      <img src={users.photo} alt="img-photo" />
                    </Table.Cell>
                  )}

                  <Table.Cell>{users.firstName}</Table.Cell>
                  <Table.Cell>{users.lastName}</Table.Cell>
                  <Table.Cell>{users.role}</Table.Cell>
                  <Table.Cell>{users.username}</Table.Cell>
                  <Table.Cell>{users.email}</Table.Cell>
                  <Table.Cell>{users.phone}</Table.Cell>
                  <Table.Cell>{users.address}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a onClick={() => handleDelete(users.id)} className="font-medium text-red-600 hover:underline ">
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
