import React, {useState, Component} from "react"
import EmployeeService from "../../components/services/EmployeeService";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "./Employees.css"

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data})
        })
    }

    render() {
        return (
            <Aux>
                <Modal />
                <h1 className="text-center">Employees Info</h1>
                <table className="table table-striped">
                    <thead>
                        <tr className="table-title-row">
                            <td>Id</td>
                            <td>Name</td>
                            <td>Surname</td>
                            <td>Contact</td>
                            <td>Login</td>
                            <td>Position</td>
                            <td>Privilege</td>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.employees.map(
                            employee =>
                                <tr key={employee.id} className="emp-row">
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.surname}</td>
                                    <td>{employee.contact}</td>
                                    <td>{employee.login}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.privilege}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Employees