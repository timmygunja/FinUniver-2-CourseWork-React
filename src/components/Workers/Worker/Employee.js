import React, {useState, Component} from "react"
import '../../../containers/App.css'
import './Employee.css'
import EmployeeService from "../../services/EmployeeService";

// const Worker = (props) => {
//
//
//     return (
//         <div className={'worker'}>
//             <hr />
//                 <p onClick={props.click}>{props.name}</p>
//                 <p>{props.lastName}</p>
//                 <input type="text" onChange={props.change} value={props.name} />
//             <hr />
//         </div>
// )
// };
//
// export default Worker;


class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees:[]
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data})
        })
    }

    render() {
        return(
            <div>
                <h1 className="text-center">Employees List: </h1>
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
            </div>
        )
    }
}

export default Employee