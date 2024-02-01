import DataTable from "react-data-table-component";
import AddJockey from "./AddJockey";
import { useNavigate } from "react-router-dom";
export default function JockeyTable({
  jockeys,
  handleAddJockey,
  isAddJockey,
  handleJockeySubmit,
  handleCloseButton,
}) {
  const navigate = useNavigate();
  const handleButtonClick = (e, row) => {
    e.preventDefault();
    console.log("Row Id", row);
    navigate("/jockey/" + row.id, row);
  };

  const columns = [
    {
      name: "Jockey",
      selector: (row) => row.name,
    },
    {
      name: "Min Odds",
      selector: (row) => row.min_odds,
    },
    {
      name: "Max Price",
      selector: (row) => row.max_odds,
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
  let view;

  if (isAddJockey) {
    view = (
      <AddJockey
        handleJockeySubmit={handleJockeySubmit}
        handleClose={handleCloseButton}
      ></AddJockey>
    );
  } else {
    view = (
      <>
        <button onClick={handleAddJockey} className="btn btn-primary">
          Add Jockey
        </button>
        <DataTable columns={columns} data={jockeys} />
      </>
    );
  }
  return (
    <>
      <div className="row">
        <div className="">{view}</div>
      </div>
    </>
  );
}

// TIME_ZONE = "Australia/Sydney"
