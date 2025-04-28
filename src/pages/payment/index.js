'use client'
// PayUFormTestOnly.js
import React, { useEffect, useState } from "react";
import axios from 'axios'

const PayUform = () => {
  const [formData, setFormData] = useState({
    key: "", 
    txnid: "",
    amount: "",
    productinfo: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    surl: "",
    furl: "",
    hash: "",
    udf1: "",
    udf2: "",
  });


useEffect(() => {
    axios
      .post("https://refactoring.elred.io/payment/makePaymentRequest/json", {
        amount: 1000,
        networkCode: "66b4a06a63752fd91d935b2c",
        userCode: "67cac8ab86be297db41fc7cd",
        plan: "yearly",
      })
      .then((response) => {
        const result = response?.data?.result?.[0];

        // Save txnid in localStorage
        if (result.txnid) {
            localStorage.setItem("transactionId", result.txnid);
        }
          
        if (result) {
          setFormData((prev) => ({
            ...prev,
            key: result.key || "",
            txnid: result.txnid || "",
            // amount: result.amount || "",
            amount: result.amount !== undefined ? String(result.amount) : "",
            productinfo: result.productinfo || "",
            firstname: result.firstname || "",
            lastname: result.lastname || "",
            email: result.email || "",
            phone: result.phone || "",
            // surl: result.surl || "",
            surl: result.surl || "",
            furl: result.furl || "",
            hash: result.hash || "",
            udf1: result.udf1 || "",
            udf2: result.udf2 || "",
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching HTML:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formData,'tashaf...')
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
        <h1>Hello World</h1>
      <form
        action="https://test.payu.in/_payment"
        method="post"
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4 d-flex flex-column p-4 gap-4 px-5"
      >
        <h2 className="text-2xl font-bold text-center">PayU Payment</h2>

        {/* Visible Inputs */}
        <input
          name="firstname"
          type="text"
          placeholder="First Name"
          className="w-full border rounded p-2"
          value={formData.firstname}
          onChange={handleChange}
          readOnly
        />
        <input
          name="lastname"
          type="text"
          placeholder="Last Name"
          className="w-full border rounded p-2"
          value={formData.lastname}
          onChange={handleChange}
          readOnly
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border rounded p-2"
          value={formData.email}
          onChange={handleChange}
          readOnly
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="w-full border rounded p-2"
          value={formData.phone}
          onChange={handleChange}
          readOnly
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="w-full border rounded p-2"
          value={formData.amount}
          onChange={handleChange}
          readOnly
        />
        <input
          name="productinfo"
          type="text"
          placeholder="Product Info"
          className="w-full border rounded p-2"
          value={formData.productinfo}
          onChange={handleChange}
          readOnly
        />

        {/* Hidden Inputs */}
        {["key", "txnid", "surl", "furl", "hash", "udf1", "udf2"].map((field) => (
          <input
            key={field}
            type="hidden"
            name={field}
            value={formData[field]}
          />
        ))}

        <button
          type="submit"
          className=" rounded btn btn-success"
        >
          Pay Now (Test Mode)
        </button>
      </form>
    </div>
  );
};

export default PayUform;
