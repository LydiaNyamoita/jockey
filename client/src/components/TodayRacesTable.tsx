import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import backend from "../configs/backend";
import moment from "moment";
export default function TodayRacesTable(id: number) {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    var url = "api/race?jockeyId=" + id["id"];
    backend
      .get(url)
      // .then((response) => response.json())
      .then((res) => {
        setRaces(res.data);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, [id]);
  console.log(id);
  const columns = [
    {
      name: "Date",
      selector: (row) => moment(row.date).format("DD/MM/YYYY"),
    },
    {
      name: "Silk",
      selector: (row) => <img src={row.silks_small}></img>,
    },
    {
      name: "Horse Number",
      selector: (row) => row.horse_number,
    },
    {
      name: "Horse Name",
      selector: (row) => row.horse_name,
    },
    {
      name: "Track",
      selector: (row) => row.track,
    },
    {
      name: "Race Number",
      selector: (row) => row.racenumber,
    },
    {
      name: "Jump Time",
      selector: (row) => row.start_time,
    },
    // {
    //   name: "Actions",
    //   button: true,
    //   cell: (row) => (
    //     <button
    //       className="btn btn-outline btn-xs"
    //       onClick={(e) => handleButtonClick(e, row)}
    //     >
    //       View
    //     </button>
    //   ),
    // },
  ];
  var view = <DataTable columns={columns} data={races} />;
  return (
    <>
      <div className="row">
        <div className="">{view}</div>
      </div>
    </>
  );
}
