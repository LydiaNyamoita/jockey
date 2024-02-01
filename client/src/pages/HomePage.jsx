import { useState, useEffect, useContext } from "react";
import AddJockey from "../components/AddJockey";
import JockeyTable from "../components/JockeyTable";
import backend from "../configs/backend";
import { AuthContext } from "../commons/AuthContext";
import { useNavigate } from "react-router-dom";
function HomePage() {
  let elem;
  const [jockeys, setJockeys] = useState([]);
  const [isAddJockey, setIsAdd] = useState(false);
  const [error, setError] = useState("");
  // const [selected, setSelected] = useState("3");
  const navigate = useNavigate();
  const { jwt, logout } = useContext(AuthContext);

  var config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    // fetch jockeys
    backend
      .get("/api/user/jockeys/", config)
      // .then((response) => response.json())
      .then((res) => {
        setJockeys(res.data);
        console.log(res);
        setIsAdd(false);
      })
      .catch((error) => {
        // setError(error);
        console.log(error);
        if (error.response.status == 401) {
          logout();
        }
      });
  }, [isAddJockey]);
  const handleAddJockey = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsAdd(true);
    navigate("/");
  };
  const addJockey = (body) => {
    backend
      .post("/api/user/jockeys/", JSON.stringify(body), config)
      // .then((response) => response.json())
      .then((res) => {
        setJockeys(res.data);
        console.log(res);
        setIsAdd(false);
        window.location.reload(false);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        if (error.response.status == 401) {
          logout();
        }
      });
  };
  const handleJockeySubmit = (
    e,
    info,
    minPrice,
    maxPrice,
    target,
    stopLoss,
    selected
  ) => {
    e.preventDefault();

    console.log("Form submitted,", info);
    var jockeyName = info["value"]["name"];
    var pf_id = info["value"]["punting_form_id"];

    var body = {
      name: jockeyName,
      punting_form_id: pf_id,
      user: null,
      max_odds: maxPrice,
      min_odds: minPrice,
      stop_loss: stopLoss,
      stop_loss_options: selected,
      target: target,
    };
    console.log(body);
    addJockey(body);
  };
  const handleCloseButton = () => {
    setIsAdd(false);
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
        handleCloseButton={handleCloseButton}
      ></JockeyTable>
    );
  }
  return <div>{elem}</div>;
}

export default HomePage;
