import React, { Component } from "react"
import Employees from "./pages/Employees/Employees";
import {Switch} from "react-router-dom";
import {Route} from "react-router";
import MainNavigation from "./components/layout/MainNavigation";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Positions from "./pages/Positions/Positions";
import Privileges from "./pages/Privileges/Privileges";
import CarBrands from "./pages/CarBrands/CarBrands";
import CarModels from "./pages/CarModels/CarModels";
import Customers from "./pages/Customers/Customers";
import Services from "./pages/Services/Services";
import Cars from "./pages/Car/Cars";
import Orders from "./pages/Orders/Orders";


class App extends Component {

    render() {
        return (
            <div>
                <MainNavigation />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/orders">
                        <Orders />
                    </Route>
                    <Route exact path="/cars">
                        <Cars />
                    </Route>
                    <Route exact path="/car-brands">
                        <CarBrands />
                    </Route>
                    <Route exact path="/services">
                        <Services />
                    </Route>
                    <Route exact path="/customers">
                        <Customers />
                    </Route>
                    <Route exact path="/car-models">
                        <CarModels />
                    </Route>
                    <Route exact path="/employees">
                        <Employees />
                    </Route>
                    <Route exact path="/positions">
                        <Positions />
                    </Route>
                    <Route exact path="/privileges">
                        <Privileges />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
