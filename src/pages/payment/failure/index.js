"use client";
// PayUFormTestOnly.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import failed from "../../../../public/credit-card.gif";
import pending from "../../../../public/file.gif";
import Link from "next/link";
import loader from "../../../../public/loader.svg";
import { FaRegCopy } from "react-icons/fa"; // Import the copy icon

const Failure = () => {
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

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
          if (result?.status === "failure" && intervalId) {
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

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.txnid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!data)
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <Image src={loader} alt="loading" />
      </div>
    );

  return (
    <div className="d-flex align-items-center justify-content-center h-100 p-4">
      <div className="d-flex align-items-center justify-content-end flex-column border border-danger p-3 rounded col-12 col-sm-6 col-md-6 col-lg-3 ">
        <h5 className="m-5">Transaction Details</h5>
        <Image
          src={data?.status == "pending" ? pending : failed}
          alt=""
          width={120}
          className="mb-2"
        />
        <h1
          className={
            data?.status == "pending" ? "text-warning" : "text-success"
          }
        >
          {data?.status == "pending" ? "Pending" : "Failed"}
        </h1>
        <p className="text-center mt-3">
          Your payment of <b>Rs. {data?.amount}</b> for the plan {data?.plan} is{" "}
          {"  "}
          {data?.status == "pending"
            ? "in pending now."
            : " failed. Please try again or contact support."}
        </p>

        <div className="fw-light text-secondary">Transaction ID</div>
        <div
          className="fw-lighter d-flex align-items-center gap-2 position-relative mb-4"
          style={{ fontSize: "13px" }}
        >
          {data?.txnid}
          <div
            onClick={handleCopy}
            style={{ cursor: "pointer" }}
            title="Copy TXNID"
          >
            <FaRegCopy />
            {copied && (
              <div
                style={{
                  position: "absolute",
                  top: "-25px",
                  background: "#000",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                Copied!
              </div>
            )}
          </div>
        </div>
        <Link href="/payment">
          <button className="btn btn-primary">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Failure;
