import React, {Component} from "react"
import EmployeeService from "../../components/services/EmployeeService";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "../style.css"
import CustomerAddForm from "./forms/CustomerAddForm";
import CustomerEditForm from "./forms/CustomerEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import CustomerService from "../../components/services/CustomerService";

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    state = {
        adding: false,
        editing: false,
        customerId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            customerId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        CustomerService.getCustomers().then((response) => {
            this.setState({customers: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <CustomerAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <CustomerEditForm customer={this.state.customers.filter(
                                cus => {return cus.id === this.state.customerId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Customers Info</h1>
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
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.customers.map(
                            customer =>
                                <tr key={customer.id} className="a-row" onClick={() => this.editingHandler(customer.id)}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.surname}</td>
                                    <td>{customer.contact}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Customers