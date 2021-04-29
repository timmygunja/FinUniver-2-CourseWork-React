import React, {Component} from "react"
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "../style.css"
import CarAddForm from "./forms/CarAddForm";
import CarEditForm from "./forms/CarEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import CarService from "../../components/services/CarService";

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        }
    }

    state = {
        adding: false,
        editing: false,
        carId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            carId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        CarService.getCars().then((response) => {
            this.setState({cars: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <CarAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <CarEditForm car={this.state.cars.filter(
                                car => {return car.id === this.state.carId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Cars Info</h1>
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
                            <td>Plate</td>
                            <td>Description</td>
                            <td>Model</td>
                            <td>Customer</td>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.cars.map(
                            car =>
                                <tr key={car.id} className="a-row" onClick={() => this.editingHandler(car.id)}>
                                    <td>{car.id}</td>
                                    <td>{car.plateNumber}</td>
                                    <td>{car.description}</td>
                                    <td>{car.carmodel.carbrand.name} {car.carmodel.name}</td>
                                    <td>{car.customer.name} {car.customer.surname}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Cars