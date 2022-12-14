import Layout from "../../../components/admin/Layout";
import { Table } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
//import ListUser from "../../../components/admin/user/listUser"

export default function User() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch(`https://beckend-takeoff-production.up.railway.app/api/v1/users`, {
      method: "GET",
    })
      .then((res) => res.json())

      .then((data) => {
        setUser(data.data.users);
        console.log("datahere", data);
        console.log(data.data);
      });
  }, []);

  return (
    <Layout>
      <div className="mt-10 z-40">
        <div className="justify justify-content-center mb-5">
          <h1 className="text-2xl">List User</h1>
        </div>

        <div className="mt-10">
          <Table key={users.id} hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>First Name</Table.HeadCell>
              <Table.HeadCell>Last Name</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Photo</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {users.map((users) => (
                <Table.Row key={users.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{users.username}</Table.Cell>
                  <Table.Cell>{users.email}</Table.Cell>
                  <Table.Cell>{users.role}</Table.Cell>
                  <Table.Cell>{users.firstName}</Table.Cell>
                  <Table.Cell>{users.lastName}</Table.Cell>
                  <Table.Cell>{users.address}</Table.Cell>
                  <Table.Cell>{users.photo}</Table.Cell>
                  <Table.Cell>{users.phone}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-between">
                      <a href="/admin/createPromo" className="w-5 h-5  font-medium text-green-600 hover:underline ">
                        <FaEdit />
                      </a>
                      <a href="/tables" className="font-medium text-red-600 hover:underline ">
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
