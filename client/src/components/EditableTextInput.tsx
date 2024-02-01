import React from "react";

export default function EditableTextInput({ label, type, edit, value }) {
  return (
    <>
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          //   htmlFor="username"
        >
          {label}
        </label>
        <input
          value={value}
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          //   id="username"
          type={type}
          readOnly={!edit}
          disabled={!edit}
        ></input>
      </div>
    </>
  );
}
