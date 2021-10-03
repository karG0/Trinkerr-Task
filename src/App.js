import React from "react";
import { Route, Switch } from "react-router-dom";

import Login  from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import Swiper from "./Components/Swiper";
import PageNotFound from "./Components/PageNotFound.jsx";

function App() {
  return (
    <Switch>
      <Route exact path={"/trinkerr-task/"} component={SignUp} />
      <Route exact path={"/signin"} component={Login} />
      <Route exact path={"/swiper"} component={Swiper} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
