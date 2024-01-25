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
      selector: (row) => row.jockeyName,
    },
    {
      name: "Min Price",
      selector: (row) => row.minPrice,
    },
    {
      name: "Max Price",
      selector: (row) => row.maxPrice,
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
    var close_btn = (
      <p
        type="button"
        hidden={!isAddJockey}
        className="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Close
      </p>
    );
    view = (
      <AddJockey
        handleJockeySubmit={handleJockeySubmit}
        closeButton={close_btn}
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
        <div className="col-md-2"></div>
        <div className="col-md-8">{view}</div>
        <div className="col-md-2"></div>
      </div>
    </>
  );
}
