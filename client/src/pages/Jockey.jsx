import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TodayRacesTable from "../components/TodayRacesTable";
export default function JockeyPage() {
  let { id } = useParams();
  const token = localStorage.getItem("token");
  const [jockey, setJockey] = useState({});
  useEffect(() => {
    // fetch jockeys
    fetch("http://127.0.0.1:5500/api/user/jockey?id=" + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJockey(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, [id, token]);

  let table;
  if (jockey) {
    console.log(jockey);
    table = <TodayRacesTable id={jockey.punting_form_id} />;
  }
  return (
    <>
      <div className="row">
        <div className="col">
          <h2>Jockey</h2>
          <pre>{JSON.stringify(jockey)}</pre>
          <h3>Todays Races</h3>
          <pre>{table}</pre>
        </div>
      </div>
    </>
  );
}
