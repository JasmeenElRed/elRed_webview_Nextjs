"use client";
// PayUFormTestOnly.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import success from "../../../../public/verified.gif";
import pending from "../../../../public/file.gif";
import Link from "next/link";
import loader from "../../../../public/loader.svg";

const Success = () => {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const txnid = localStorage.getItem("transactionId");
  //   if (txnid) {
  //     axios
  //       .get(
  //         `https://refactoring.elred.io/payment/getFinalPaymentStatus?txnid=${txnid}`
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         setData(response?.data?.result?.[0]);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching HTML:", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const txnid = localStorage.getItem("transactionId");
    let intervalId;
  
    const fetchData = async () => {
      if (txnid) {
        try {
          const response = await axios.get(
            `https://refactoring.elred.io/payment/getFinalPaymentStatus?txnid=${txnid}`
          );
          const result = response?.data?.result?.[0];
          console.log(response);
          setData(result);
  
          // Stop polling if status is "failed"
          if (result?.status === "success" && intervalId) {
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error("Error fetching payment status:", error);
        }
      }
    };
  
    fetchData(); // Initial fetch
    intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
  
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (!data)
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <Image src={loader} alt="loading" />
      </div>
    );

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
          Your payment of <b>Rs. {data?.amount}</b> for the plan {data?.plan} is
          {" "}
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
