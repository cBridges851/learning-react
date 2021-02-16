import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from "./App.js";
import NotFound from "./NotFound.js";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StorePicker} />
            <Route path="/store/:storeId" component={App} />
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Router;