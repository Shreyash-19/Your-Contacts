import React from "react";
import axios from "axios";
import Card from "./Card";
import App from "./App";

function Buttons(props) {
  const [user, setUser] = React.useState({
    firstname: " ",
    lastname: " ",
    email: " ",
    id: -1,
    img: " "
  });

  const requestData = (props) => {
    axios.get("https://reqres.in/api/users/" + props.id).then((response) => {
      setUser({
        ...user,
        firstname: response.data.data.first_name,
        lastname: response.data.data.last_name,
        img: response.data.data.avatar,
        email: response.data.data.email,
        id: response.data.data.id
      });
    });
  };
  return (
    <div>
      <button
        onClick={(event) => [requestData(props), props.childToParent(user)]}
        style={{
          display: "inline",
          borderRadius: "4px",
          cursor: "pointer",
          justifyContent: "space-between"
        }}
      >
        {props.id}
      </button>
    </div>
  );
}
export default Buttons;
