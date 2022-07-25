import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/fetchdata";
import Buttons from "./Buttons";
import axios from "axios";
import "./Card.css";
import Card from "./Card";
import ErrorBoundary from "./Errorboundary";

function App() {
  let [users, setUsers] = React.useState([]);

  let [inf, setinf] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    img: "",
    id: ""
  });

  const childToParent = (childdata) => {
    setinf({
      ...inf,
      firstname: childdata.firstname,
      lastname: childdata.lastname,
      email: childdata.email,
      img: childdata.img,
      id: childdata.id
    });
  };

  const fetchData = () => {
    axios.get("https://reqres.in/api/users?page=2").then((response) => {
      setUsers(response.data.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      <Card
        name={inf.firstname + " " + inf.lastname}
        email={inf.email}
        img={inf.img}
      />

      <br />

      {users.length > 0 &&
        users.map((user) => {
          return (
            <div style={{ display: "inline-block" }} key={user.id}>
              <Buttons childToParent={childToParent} id={user.id} />
            </div>
          );
        })}
      <h4>DOUBLE CLICK</h4>
    </div>
  );
}

export default App;
