import React, {Component} from "react"
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "../style.css"
import OrderAddForm from "./forms/OrderAddForm";
import OrderEditForm from "./forms/OrderEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderService from "../../components/services/OrderService";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    state = {
        adding: false,
        editing: false,
        orderId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            orderId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        OrderService.getOrders().then((response) => {
            this.setState({orders: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <OrderAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <OrderEditForm order={this.state.orders.filter(
                                ord => {return ord.id === this.state.orderId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Orders Info</h1>
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
                            <td>Car</td>
                            <td>Employee</td>
                            <td>Service</td>
                            <td>Is Done</td>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.orders.map(
                            order =>
                                <tr key={order.id} className="a-row" onClick={() => this.editingHandler(order.id)}>
                                    <td>{order.id}</td>
                                    <td>{order.car.carmodel.carbrand.name} {order.car.carmodel.name}</td>
                                    <td>{order.employee.name} {order.employee.surname}</td>
                                    <td>{order.services.name}</td>
                                    <td>{order.isDone}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Orders