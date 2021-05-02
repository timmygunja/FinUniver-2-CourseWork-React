import React, {Component} from "react"
import ServicesService from "../../components/services/ServicesService";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "../style.css"
import ServicesAddForm from "./forms/ServicesAddForm";
import ServicesEditForm from "./forms/ServicesEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
    }

    state = {
        adding: false,
        editing: false,
        servicesId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            servicesId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        ServicesService.getServices().then((response) => {
            this.setState({services: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <ServicesAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <ServicesEditForm services={this.state.services.filter(
                                ser => {return ser.id === this.state.servicesId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Services Info</h1>
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
                            <td>Cost</td>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.services.map(
                            service =>
                                <tr key={service.id} className="a-row" onClick={() => this.editingHandler(service.id)}>
                                    <td>{service.id}</td>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>{service.cost} ₽</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Services