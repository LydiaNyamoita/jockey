import JockeyDropdown from "./JockeyDropdown";
import { useState, useEffect } from "react";
import React from "react";
import TextInput from "./TextInput";
import backend from "../configs/backend";
import { Jockey } from "../models/jockey";
import StopLossRadio from "./StopLossRadio";
import CloseButton from "./CloseButton";
import { useNavigate } from "react-router-dom";
const AddJockey = ({ handleJockeySubmit, handleClose }) => {
  const stopLossHandler = (e) => {
    setStopLoss(e.target.value);
  };
  const targetHandler = (e) => {
    console.log(e.target.value * 100);
    setStopLoss(e.target.value * 100);
    setTarget(e.target.value);
  };
  const navigate = useNavigate();
  const [jockeys, setJockeys] = useState([]);
  const [info, setInfo] = useState();
  const [minOdds, setMinOdds] = useState(1);
  const [maxOdds, setMaxOdds] = useState(100);
  const [target, setTarget] = useState(1);
  const [stopLoss, setStopLoss] = useState(target * 100);
  const [isValid, setIsValid] = useState(false);
  const [isRestart, setIsRestart] = useState(false);
  const [selected, setSelected] = useState("3");
  //   This effect runs when 'data' changes
  useEffect(() => {
    // fetch jockeys
    backend
      .get("/api/jockeys/")
      // .then((response) => response.json())
      .then((res) => {
        setJockeys(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));

    // If there is data, the form is valid
    setIsValid(info ? true : false);
  }, [info]);

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) =>
            handleJockeySubmit(
              e,
              info,
              minOdds,
              maxOdds,
              target,
              stopLoss,
              selected
            )
          }
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-3  place-items-end pb-2">
            <div></div>
            <div></div> <CloseButton handleClose={handleClose}></CloseButton>{" "}
          </div>
          <div className="mb-4">
            <JockeyDropdown
              jockeys={jockeys}
              setSelected={setInfo}
              error={undefined}
            ></JockeyDropdown>
            {!isValid && <p>You must choose a value</p>}
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <TextInput
                label={"Target"}
                onChange={(e) => targetHandler(e)}
                value={target}
                type={"number"}
              ></TextInput>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <TextInput
                label={"Stop Loss"}
                type={"number"}
                onChange={(e) => stopLossHandler(e)}
                value={stopLoss}
              ></TextInput>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <TextInput
                label={"Min Odds"}
                onChange={(e) => setMinOdds(e.target.value)}
                value={minOdds}
                type={"number"}
              ></TextInput>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <TextInput
                label={"Max odds"}
                type={"number"}
                onChange={(e) => setMaxOdds(e.target.value)}
                value={maxOdds}
              ></TextInput>
            </div>
          </div>
          <div className="mb-2">
            {/* <input
              type="checkbox"
              checked={isRestart}
              name="checkbox-two"
              id="checkbox-two"
              onChange={() => setIsRestart((prev) => !prev)}
            />
            <label htmlFor="checkbox-one" className="ml-3">
              Continue after win
            </label> */}
            <StopLossRadio
              selected={selected}
              setSelected={setSelected}
            ></StopLossRadio>
          </div>

          <div className="flex items-center justify-center">
            <button
              disabled={!isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Jockey
            </button>
            {/* {closeButton} */}
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
