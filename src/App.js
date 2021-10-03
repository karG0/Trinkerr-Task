import React from "react";
import { Route, Switch } from "react-router-dom";

import Login  from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import Swiper from "./Components/Swiper";

function App() {
  return (
    <Switch>
      <Route exact path={"/"} component={SignUp} />
      <Route exact path={"/signin"} component={Login} />
      <Route exact path={"/swiper"} component={Swiper} />
    </Switch>
  );
}

export default App;
