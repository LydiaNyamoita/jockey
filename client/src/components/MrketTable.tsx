import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import backend from "../configs/backend";
import { AuthContext } from "../commons/AuthContext";
import { useNavigate } from "react-router-dom";
// import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment-timezone";
export default function MarketTable(id: number) {
  const { jwt } = useContext(AuthContext);
  const [pending, setPending] = React.useState(true);
  const navigate = useNavigate();
  const handleButtonClick = (e, row) => {
    e.preventDefault();
    console.log("Row Id", row);
    var url = "/jockey/" + row.id + "/bet";
    navigate(url, { state: row });
  };

  const [markets, setMarkets] = useState([]);
  var config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    var url = "api/betfair/markets?jockeyId=" + id["id"];
    backend
      .get(url, config)
      // .then((response) => response.json())
      .then((res) => {
        setMarkets(res.data);
        setPending(false);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setPending(false);
      });
  }, [id]);
  const columns = [
    {
      name: "Date",
      selector: (row) =>
        moment(row.market.market_start_time).format("DD-MM-YYYY"),

      // <Moment date={new Date(row.market.market_start_time)} />
    },
    // { name: "Venue", selector: (row) => row["event"]["venue"] },
    {
      name: "Time",
      selector: (row) =>
        moment(row.market.market_start_time)
          .tz(row.runner.event.timezone)
          .format("HH:mm"),
    },
    { name: "Venue", selector: (row) => row.runner.event.venue },
    { name: "Market", selector: (row) => row.market.market_name },
    // {
    //   name: " ",
    //   selector: (row) =>  <img src={"http://content-cache.betfair.com/feeds_images/Horses/SilkColours/"+row.colours_filename} alt="" />,
    // },
    {
      name: "Horse ",
      selector: (row) => row.runner.runner_name,
    },
    {
      name: "Odds",
      selector: (row) => row.runner.odds,
      // moment(row.marketStartTime).format("MM-DD-YYYY HH:MM:SS"),
    },
    {
      name: "Last Price Matched",
      selector: (row) => row.runner.last_price_traded,
      // moment(row.marketStartTime).format("MM-DD-YYYY HH:MM:SS"),
    },
    {
      name: "Target",
      selector: (row) => row.runner.target,
      // moment(row.marketStartTime).format("MM-DD-YYYY HH:MM:SS"),
    },
    {
      name: "Invest",
      selector: (row) => row.runner.invest,
      // moment(row.marketStartTime).format("MM-DD-YYYY HH:MM:SS"),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-outline btn-xs"
          onClick={(e) => handleButtonClick(e, row)}
        >
          View
        </button>
      ),
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.runner.status === "WINNER",
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "white",
      },
    },

    {
      when: (row) => row.runner.status === "LOSER",
      style: {
        backgroundColor: "rgba(242, 38, 19, 0.9)",
        color: "white",
      },
    },
    {
      when: (row) => row.runner.status === "REMOVED",
      style: {
        backgroundColor: "rgba(42, 38, 19, 0.9)",
        color: "white",
      },
    },
  ];
  return (
    <>
      <div>div table</div>
      {console.log(markets)}
      <DataTable
        columns={columns}
        data={markets}
        progressPending={pending}
        progressComponent={<LoadingComponent />}
        conditionalRowStyles={conditionalRowStyles}
        pagination
      ></DataTable>
    </>
  );
}
function LoadingComponent() {
  return (
    <div className="text-center">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
