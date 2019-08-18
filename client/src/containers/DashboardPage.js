import React, { useState } from "react";
import Dashboard from "../components/user/Dashboard";
import axios from "axios";
import { connect } from "react-redux";

const DashboardPage = ({ user }) => {
   const [message, setMessage] = useState("");

   const handleClick = () => {
      axios
         .get("/api/private/secret")
         .then(res => {
            setMessage(res.data.message);
         })
         .catch(err => console.log(err));
   };
   return <Dashboard user={user} message={message} onClick={handleClick} />;
};

const mapStateToProps = state => ({
   user: state.auth.user
});

export default connect(mapStateToProps)(DashboardPage);
