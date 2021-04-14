import React, { Component } from "react"
import './App.css'
import Employees from "./containers/Employees/Employees";
import {BrowserRouter, Link} from "react-router-dom";
import {Route} from "react-router";

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
            <BrowserRouter>
            <div>
                <header className="header">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/employees">Employees</Link></li>
                        </ul>
                    </nav>
                </header>
                <hr />


                <Route exact path="/">
                    <h2>Home</h2>
                </Route>


                <Route exact path="/employees">
                    <Employees />
                </Route>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
