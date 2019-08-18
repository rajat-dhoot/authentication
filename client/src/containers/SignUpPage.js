import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../actions/authActions";
import Validate from "../components/form/Validate";
import SignUp from "../components/auth/SignUp";

const SignUpPage = ({ history, registerUser, auth, errors, clearErrors }) => {
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      errors: {}
   });

   useEffect(() => {
      const unlisten = history.listen(() => clearErrors());
      return () => unlisten();
   }, [history, clearErrors]);

   useEffect(() => {
      if (auth.isAuthenticated) history.push("/dashboard");
      setUser(user => {
         return { ...user, errors: { ...user.errors, ...errors } };
      });
   }, [errors, auth, history]);

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   const handleBlur = e => {
      const { name, value } = e.target;
      const err = { ...user.errors, ...Validate(name, value).errors };
      setUser({ ...user, errors: { ...err } });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { name, email, password } = user;
      registerUser({ name, email, password }, history);
   };

   return (
      <SignUp
         loading={auth.loading}
         user={{ ...user }}
         onBlur={handleBlur}
         onChange={handleChange}
         onSubmit={handleSubmit}
      />
   );
};

SignUpPage.propTypes = {
   registerUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(
   mapStateToProps,
   { registerUser, clearErrors }
)(SignUpPage);
