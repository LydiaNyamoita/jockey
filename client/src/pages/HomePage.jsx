import { useState, useEffect } from "react";
import AddJockey from "../components/AddJockey";
import JockeyTable from "../components/JockeyTable";
function HomePage() {
  let elem;
  const [jockeys, setJockeys] = useState([]);
  const [isAddJockey, setIsAdd] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    // fetch jockeys
    fetch("http://127.0.0.1:5500/api/user/jockeys", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJockeys(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, [isAddJockey]);
  const handleAddJockey = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsAdd(true);
  };
  const addJockey = (body) => {
    fetch("http://127.0.0.1:5500/api/user/jockey", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // setJockeys(data);
        console.log(data);
        setIsAdd(false);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };
  const handleJockeySubmit = (e, info, minPrice, maxPrice) => {
    e.preventDefault();

    console.log("Form submitted,", info);
    var jockeyName = info["value"]["jockeyName"];
    var pf_id = info["value"]["punting_form_id"];

    var body = {
      puntingFormId: pf_id,
      jockeyName: jockeyName,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    console.log(body);
    addJockey(body);
  };
  if (jockeys.length === 0) {
    elem = (
      <AddJockey
        handleJockeySubmit={handleJockeySubmit}
        error={error}
      ></AddJockey>
    );
  } else {
    elem = (
      <JockeyTable
        jockeys={jockeys}
        handleAddJockey={handleAddJockey}
        isAddJockey={isAddJockey}
        handleJockeySubmit={handleJockeySubmit}
        // handleCloseButton={setIsAdd(false)}
      ></JockeyTable>
    );
  }
  return <div>{elem}</div>;
}

export default HomePage;
