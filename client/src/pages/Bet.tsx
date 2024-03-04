import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../commons/AuthContext";
import backend from "../configs/backend";

export default function BetPage(row) {
  const [amount, setAmount] = React.useState("");
  const { state } = useLocation();
  const { jwt } = useContext<{ jwt: string }>(AuthContext);

  var config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const handleBetSubmit = (e, amount) => {
    e.preventDefault();
    var body = {
      amount: amount,
      odds: state.odds,
      selectionId: state.selectionId,
      marketId: state.marketId,
    };
    console.log(body);
    backend
      .post("api/betfair/bet/place", JSON.stringify(body), config)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.data));
  };
  console.log(state);
  return (
    <>
      <div>bet page</div>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={
            (e) => handleBetSubmit(e, amount)
            // console.log(e)
          }
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Runner Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={state.runnerName}
              readOnly={true}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Odds
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="number"
              value={state.odds}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Amount
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Place Bet
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
function handleBetSubmit() {
  throw new Error("Function not implemented.");
}
