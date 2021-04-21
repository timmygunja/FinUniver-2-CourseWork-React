import React, { Component } from "react"
import './App.css'
import Employees from "./containers/Employees/Employees";
import {Link, Switch} from "react-router-dom";
import {Route} from "react-router";
import MainNavigation from "./components/layout/MainNavigation";

// import Employee from "../components/Employees/Employee/Employee"


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
                        <h2>Home</h2>
                    </Route>


                    <Route exact path="/employees">
                        <Employees />
                    </Route>
                </Switch>

                {/*<div>*/}
                    {/*<header className="header">*/}
                    {/*    <nav>*/}
                    {/*        <ul>*/}
                    {/*            <li><Link to="/">Home</Link></li>*/}
                    {/*            <li><Link to="/employees">Employees</Link></li>*/}
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
