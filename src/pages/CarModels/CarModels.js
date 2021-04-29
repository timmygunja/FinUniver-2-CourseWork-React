import React, {Component} from "react"
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "../style.css"
import CarModelAddForm from "./forms/CarModelAddForm";
import CarModelEditForm from "./forms/CarModelEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import CarModelService from "../../components/services/CarModelService";

class CarModels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carmodels: []
        }
    }

    state = {
        adding: false,
        editing: false,
        carmodelId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            carmodelId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        CarModelService.getCarModels().then((response) => {
            this.setState({carmodels: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <CarModelAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <CarModelEditForm carmodel={this.state.carmodels.filter(
                                carmodel => {return carmodel.id === this.state.carmodelId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Car Models Info</h1>
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
                            <td>Description</td>
                            <td>Car brand</td>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.carmodels.map(
                            carmodel =>
                                <tr key={carmodel.id} className="a-row" onClick={() => this.editingHandler(carmodel.id)}>
                                    <td>{carmodel.id}</td>
                                    <td>{carmodel.name}</td>
                                    <td>{carmodel.description}</td>
                                    <td>{carmodel.carbrand.name}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default CarModels