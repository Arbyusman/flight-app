import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "flowbite-react";

const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const [users, setUsers] = useState([]);
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    handleGetTransaction();
    handleGetUser();
    handleGetPromo();
  }, []);

  const handleGetTransaction = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/transaction`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setTransaction(data.data);
        console.log("data transaction", data.data);
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
        setUsers(data.data);
        console.log("data users", data.data);
      });
  };

  const handleGetPromo = () => {
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
        console.log("data promo", data.data);
      });
  };

  return (
    <>
      <main className="z-40 p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Admin TakeOFF</h2>
          </div>
        </div>
        <h1 className="text-center text-4xl font-semibold mb-2">Transaction</h1>
        <div className="mt-10 border-spacing-2">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Ticket</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Promo</Table.HeadCell>
              <Table.HeadCell>Total</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {transaction.length > 0 ? (
                transaction.map((transaction) => (
                  <Table.Row
                    key={transaction.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{transaction.ticket_id}</Table.Cell>
                    {transaction.user_id === null ? (
                      <Table.Cell></Table.Cell>
                    ) : (
                      <Table.Cell>{transaction.User.username}</Table.Cell>
                    )}

                    {transaction.promo_id === null ? (
                      <Table.Cell></Table.Cell>
                    ) : (
                      <Table.Cell>{transaction.Promo.name}</Table.Cell>
                    )}

                    <Table.Cell>Rp. {transaction.total}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <div></div>
              )}
            </Table.Body>
          </Table>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
