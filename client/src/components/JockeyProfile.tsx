import React from "react";
import { useState, useEffect, useContext } from "react";
import EditableTextInput from "./EditableTextInput";
import backend from "../configs/backend";
import { AuthContext } from "../commons/AuthContext";
import { useNavigate } from "react-router-dom";
export default function JockeyProfile({ img, jockey }) {
  const { jwt, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const handleDelete = () => {
    console.log("delete");
    console.log(jockey);
    var url = "/user/jockeys/" + jockey.id + "/";
    backend
      .delete(url, config)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  const handleEdit = () => {
    console.log("edit");
  };
  return (
    <>
      <div
        className="box-border rounded shadow-lg p-3 m-2 "
        style={
          {
            //   height: 400,
          }
        }
      >
        <h1 className="text-center">{jockey.name}</h1>
        <div className="">
          <div className="col-span-1">
            <div className="grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <img
                className="object-cover object-center rounded-full"
                src="https://placehold.co/400x400"
                alt="nature image"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <EditableTextInput
              label={"Min Odds"}
              type={"number"}
              edit={false}
              value={jockey.min_odds}
            ></EditableTextInput>
            <EditableTextInput
              label={"Max Odds"}
              type={undefined}
              edit={false}
              value={jockey.max_odds}
            ></EditableTextInput>
            <EditableTextInput
              label={"Target"}
              type={"number"}
              edit={false}
              value={jockey.target}
            ></EditableTextInput>
            <EditableTextInput
              label={"Stop Loss"}
              type={"number"}
              edit={false}
              value={jockey.stop_loss}
            ></EditableTextInput>
          </div>
        </div>
        <div className="place-self-center">
          <p className="inline-flex gap-10 items-center">
            <button
              onClick={handleEdit}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-white hover:bg-red-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Delete
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
