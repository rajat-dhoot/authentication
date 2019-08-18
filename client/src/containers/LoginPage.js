import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Login from "../components/auth/Login";
import Validate from "../components/form/Validate";
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../actions/authActions";

const LoginPage = ({ loginUser, auth, errors, history, clearErrors }) => {
   const [user, setUser] = useState({
      email: "",
      password: "",
      errors: {}
   });

   // this effect is used to clear Errors on route change it will run only once
   useEffect(() => {
      const unlisten = history.listen(() => clearErrors());
      return () => unlisten();
   }, [history, clearErrors]);

   useEffect(() => {
      if (auth.isAuthenticated) {
         history.push("/dashboard");
      }
      setUser(user => {
         return { ...user, errors: { ...user.errors, ...errors } };
      });
   }, [auth, errors, history]);

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   const handleBlur = e => {
      const { name, value } = e.target;
      const errors = { ...user.errors, ...Validate(name, value).errors };
      setUser({ ...user, errors: { ...errors } });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { email, password } = user;
      loginUser({ email, password });
   };

   return (
      <Login
         loading={auth.loading}
         user={{ ...user }}
         onBlur={handleBlur}
         onChange={handleChange}
         onSubmit={handleSubmit}
      />
   );
};

LoginPage.propTypes = {
   loginUser: PropTypes.func.isRequired,
   clearErrors: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(
   mapStateToProps,
   { loginUser, clearErrors }
)(LoginPage);
