import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import backend from "../configs/backend";
import axios from "axios";
// get betfair details
export default function BetfairDetails() {
  const [email, setEmail] = useState("chef_201918@protonmail.com");
  const [password, setPassword] = useState("xkr2cc*BaqEbv2");
  const formSchema = yup.object().shape({
    // email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Must enter a password"),
    // .min(6, "Password must be at least 6 characters long"),
  });
  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      JSON.stringify(values);
      var body = { username: values.email, password: values.password };
      const encodedParams = new URLSearchParams();
      encodedParams.set("password", "xkr2cc*BaqEbv2");
      encodedParams.set("", "chef_201918@protonmail.com");

      const options = {
        method: "POST",
        url: "https://identitysso.betfair.com.au/api/login",
        headers: {
          "X-Application": "Sy7I6g5iDQnIdn2u",
          "Content-Type": "application/json",
        },
        data: encodedParams,
      };
      try {
        console.log(body);

        // axios
        //   .request(options)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
        // backend
        //   .post("", body)
        //   .then((res) => {})
        //   .catch(() => {});
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <>
      <div style={{ width: 400 }}>
        <div className="text-center text-lg">Betfair Details</div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
