import React, {Component} from "react"
import CarBrandService from "../../components/services/CarBrandService";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "./CarBrands.css"
import CarBrandAddForm from "./forms/CarBrandAddForm";
import CarBrandEditForm from "./forms/CarBrandEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";

class CarBrands extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carbrands: []
        }
    }

    state = {
        adding: false,
        editing: false,
        carbrandId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            carbrandId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        CarBrandService.getCarBrands().then((response) => {
            this.setState({carbrands: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <CarBrandAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <CarBrandEditForm carbrand={this.state.carbrands.filter(
                                carbrand => {return carbrand.id === this.state.carbrandId})[0]} />
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
                            <td>Description</td>
                            <td>Image</td>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.carbrands.map(
                            carbrand =>
                                <tr key={carbrand.id} className="carbrand-row" onClick={() => this.editingHandler(carbrand.id)}>
                                    <td>{carbrand.id}</td>
                                    <td>{carbrand.name}</td>
                                    <td>{carbrand.description}</td>
                                    <td>{carbrand.image}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default CarBrands