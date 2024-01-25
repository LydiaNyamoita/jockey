import JockeyDropdown from "./JockeyDropdown";
import { useState, useEffect } from "react";
import React from "react";
import TextInput from "./TextInput";
const AddJockey = ({ handleJockeySubmit, closeButton }) => {
  const [jockeys, setJockeys] = useState([]);
  const [info, setInfo] = useState();
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100);
  const [isValid, setIsValid] = useState(false);

  //   This effect runs when 'data' changes
  useEffect(() => {
    // fetch jockeys
    fetch("http://127.0.0.1:5500/api/jockeys", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setJockeys(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
    // If there is data, the form is valid
    setIsValid(info ? true : false);
  }, [info]);

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => handleJockeySubmit(e, info, minPrice, maxPrice)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <JockeyDropdown
              jockeys={jockeys}
              setSelected={setInfo}
            ></JockeyDropdown>
            {!isValid && <p>You must choose a value</p>}
          </div>
          <TextInput
            label={"Min Price"}
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
            type={"number"}
          ></TextInput>
          <TextInput
            label={"Max Price"}
            type={"number"}
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
          ></TextInput>

          <div className="flex items-center justify-center">
            <button
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Jockey
            </button>
            {closeButton}
          </div>
        </form>
        {/* <p className="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p> */}
      </div>
    </div>
  );
};
export default AddJockey;
