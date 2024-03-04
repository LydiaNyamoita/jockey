import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TodayRacesTable from "../components/TodayRacesTable";
import { AuthContext } from "../commons/AuthContext";
import backend from "../configs/backend";
import JockeyProfile from "../components/JockeyProfile";
import MarketTable from "../components/MrketTable";
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
      <div className="flex flex-row">
        <div style={{ height: 600 }} className="basis-1/2">
          {/* {table}
           */}
          <MarketTable id={jockey.id}></MarketTable>
        </div>
        <div className="basis-1/4">
          <JockeyProfile jockey={jockey}></JockeyProfile>
        </div>
      </div>
      {/* <div>Open markets</div>
      <div>
        <MarketTable id={jockey.id}></MarketTable>
      </div> */}
    </>
  );
}
