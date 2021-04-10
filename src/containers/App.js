import React, { Component } from "react"
import './App.css'
import Employee from "../components/Workers/Worker/Employee"


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
                {/*<Employees*/}
                {/*    workers={this.state.workers}*/}
                {/*    clicked={this.deleteWorkerHandler}*/}
                {/*    changed={this.changeNameHandler}*/}
                {/*/>*/}
                <Employee />
            </div>
        );
    }
}

export default App;
