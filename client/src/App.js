import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Landing from "./components/layout/Landing";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import Navbar from "./containers/Navbar";
import DashboardPage from "./containers/DashboardPage";
import PrivateRoute from "./utils/PrivateRoute";

if (localStorage.jwtToken) {
   const token = localStorage.jwtToken;
   setAuthToken(token);
   const decoded = jwt_decode(token);
   store.dispatch(setCurrentUser(decoded));
   const currentTime = Date.now() / 1000;
   if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "./login";
   }
}

const App = () => {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Navbar />
            <hr />
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Switch>
               <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
               />
               <Redirect from="*" to="/" />
            </Switch>
         </BrowserRouter>
      </Provider>
   );
};

export default App;
