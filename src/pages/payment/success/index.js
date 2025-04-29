"use client";
// PayUFormTestOnly.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import success from "../../../../public/verified.gif";
import pending from "../../../../public/file.gif";
import Link from "next/link";

const Success = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const txnid = localStorage.getItem("transactionId");
    if (txnid) {
      axios
        .get(
          `https://refactoring.elred.io/payment/getFinalPaymentStatus?txnid=${txnid}`
        )
        .then((response) => {
          console.log(response);
          setData(response?.data?.result?.[0]);
        })
        .catch((error) => {
          console.error("Error fetching HTML:", error);
        });
    }
  }, []);

  if (!data) return <div>Loading...</div>;

  //   useEffect(() => {
  //     const txnid = localStorage.getItem("transactionId");
  //     if (txnid) {
  //       axios
  //         .get(
  //           `https://refactoring.elred.io/payment/getFinalPaymentStatus?txnid=${txnid}`
  //         )
  //         .then((res) => {
  //           setData(res?.data?.result);
  //         })
  //         .catch((err) => console.error(err));
  //     }
  //   }, []);

  //   if (!data) return <div>Loading...</div>;

  return (
    <div className="d-flex align-items-center justify-content-center h-100 p-4 max">
      <div className="d-flex align-items-center justify-content-end  flex-column border border-success p-3 rounded col-12 col-sm-6 col-md-6 col-lg-3 ">
        <h5 className="m-5">Transaction Details</h5>
        <Image
          src={data?.status == "pending" ? pending : success}
          alt=""
          width={120}
          className="mb-2"
        />
        <h1
          className={
            data?.status == "pending" ? "text-warning" : "text-success"
          }
        >
          {data?.status == "pending" ? "Pending" : "Success"}
        </h1>
        <p className="text-center mt-3">
          Your payment of <b>Rs. {data?.amount}</b> for the plan {data?.plan}
          is{" "}
          {data?.status == "pending"
            ? "in pending now."
            : "processed successfully."}
        </p>
        <Link href="/payment">
          <button className="btn btn-primary">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
