import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdArrowRoundForward, IoIosTimer } from "react-icons/io";
import { IoAirplaneOutline } from "react-icons/io5";

import { MdOutlineLuggage } from "react-icons/md";
import { BiJoystick } from "react-icons/bi";
import { GiBackpack } from "react-icons/gi";
import Image from "next/image";

export default function Invoice() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    getTransaction();
    setToken(token);
  }, [router.isReady]);

  const getTransaction = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_ENDPOINT}api/v1/transaction/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setData(data.data);
        console.log("data", data.data);
      });
  };
  return (
    <div>
      <div></div>
    </div>
  );
}
