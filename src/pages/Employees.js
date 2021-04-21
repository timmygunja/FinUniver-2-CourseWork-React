import React, {Component} from "react"
import EmployeeService from "../components/services/EmployeeService";
import Modal from "../components/UI/Modal/Modal";
import Aux from "../hoc/Aux/Aux";
import "./Employees.css"
import EmployeeAddForm from "../containers/Employees/Employee/EmployeeAddForm";
import EmployeeEditForm from "../containers/Employees/Employee/EmployeeEditForm";
import Spinner from "../components/UI/Spinner/Spinner";

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    state = {
        adding: false,
        editing: false,
        employeeId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            employeeId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <EmployeeAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <EmployeeEditForm employee={this.state.employees.filter(
                                emp => {return emp.id === this.state.employeeId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Employees Info</h1>
                    <div className="buttons">
                        <button className="AddButton" onClick={this.addingHandler}>
                            <img alt="+" className="plus" src="/plus.png" />
                        </button>
                    </div>
                </div>
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
                                <tr key={employee.id} className="emp-row" onClick={() => this.editingHandler(employee.id)}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.surname}</td>
                                    <td>{employee.contact}</td>
                                    <td>{employee.login}</td>
                                    <td>{employee.position.name}</td>
                                    <td>{employee.privilege.name}</td>
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