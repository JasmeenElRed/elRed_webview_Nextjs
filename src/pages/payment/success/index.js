"use client";
// PayUFormTestOnly.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Success = () => {
  
console.log('success page rendered now....')
  useEffect(() => {

    const txnid = localStorage.getItem('transactionId')
    axios
      .get(`https://refactoring.elred.io/payment/getFinalPaymentStatus?txnid=${txnid}`)
      .then((response) => {
        console.log(response)
      }
        )
      .catch((error) => {
        console.error("Error fetching HTML:", error);
      });
  }, []);

  
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <h1>Hello World</h1>
      <h1>Success page....</h1>
    </div>
  );
};

export default Success;
