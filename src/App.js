import React, { Component } from "react"
import './App.css'
import Employees from "./pages/Employees/Employees";
import {Switch} from "react-router-dom";
import {Route} from "react-router";
import MainNavigation from "./components/layout/MainNavigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Positions from "./pages/Positions/Positions";
import Privileges from "./pages/Privileges/Privileges";

// import forms from "../components/Privileges/forms/forms"


class App extends Component {

    // usernameChangedHandler = (e) => {
    //     this.setState({username: e.target.value})
    // }

    changeNameHandler = (event, id) => {
        const employeeIndex = this.state.workers.findIndex(w => {return w.id === id})

        const employee = {
            ...this.state.employees[employeeIndex]
        }

        employee.name = event.target.value

        const employees = [...this.state.employees]
        employees[employeeIndex] = employee

        this.setState({employees: employees})
    }

    deleteWorkerHandler = (employeeIndex) => {
        const employees = [...this.state.employees]
        employees.splice(employeeIndex,1)
        this.setState({employees: employees})
    }

    render() {
        return (
            <div>
                <MainNavigation />
                <Switch>
                    <Route exact path="/">
                        <Home />
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

                {/*<div>*/}
                    {/*<header className="header">*/}
                    {/*    <nav>*/}
                    {/*        <ul>*/}
                    {/*            <li><Link to="/">Home</Link></li>*/}
                    {/*            <li><Link to="/employees">Privileges</Link></li>*/}
                    {/*        </ul>*/}
                    {/*    </nav>*/}
                    {/*</header>*/}
                    {/*<hr />*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default App;
