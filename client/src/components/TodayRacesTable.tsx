import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
export default function TodayRacesTable( id: number ) {
  const [races, setRaces] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5500/api/race?jockeyId=" + id['id'], {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRaces(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  console.log(id)
  const columns = [
    {
      name: "Silk",
      selector: (row) => (<img src={row.silksSmall}></img>),
    },
    {
      name: "Horse Number",
      selector: (row) => row.horseNumber,
    },
    {
      name: "Horse Name",
      selector: (row) => row.horseName,
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
      selector: (row) => row.startTime,
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
        <div className="col-md-2"></div>
        <div className="col-md-8">{view}</div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}
