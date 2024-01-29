import React, { useState } from "react";

export default function StopLossRadio({ selected, setSelected }) {
  const handleOptionChange = function (changeEvent) {
    setSelected(changeEvent.target.value);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="text-xl text-center font-bold">Stop Loss Options</div>
      <form className="space-y-5 p-2">
        <div>
          <input
            type="radio"
            name="radio"
            id="radio-one"
            value="1"
            className="w-6 h-6  cursor-pointer"
            onChange={handleOptionChange}
            checked={selected === "1"}
          />
          <label htmlFor="radio-one" className="ml-2">
            Continue + Restart
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="radio"
            id="radio-two"
            className="w-6 h-6 cursor-pointer"
            onChange={handleOptionChange}
            value="2"
            checked={selected === "2"}
          />
          <label htmlFor="radio-two" className="ml-2">
            Continue + No Restart
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="radio"
            id="radio-three"
            className="w-6 h-6 cursor-pointer"
            onChange={handleOptionChange}
            value="3"
            checked={selected === "3"}
          />
          <label htmlFor="radio-three" className="ml-2">
            Don't Continue
          </label>
        </div>
      </form>
    </div>
  );
}
