import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TodayRacesTable from "../components/TodayRacesTable";
import { AuthContext } from "../commons/AuthContext";
import backend from "../configs/backend";
export default function JockeyPage() {
  let { id } = useParams();

  const [jockey, setJockey] = useState({});
  const { jwt, logout } = useContext(AuthContext);

  var url = "api/user/jockeys/" + id;
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    backend
      .get(url, config)

      .then((res) => {
        setJockey(res.data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          logout();
        }
      });
  }, [id, jwt, url]);

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
