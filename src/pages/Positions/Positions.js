import React, {Component} from "react"
import PositionService from "../../components/services/PositionService";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "./Positions.css"
import PositionAddForm from "./forms/PositionAddForm";
import PositionEditForm from "./forms/PositionEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";

class Positions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: []
        }
    }

    state = {
        adding: false,
        editing: false,
        positionId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            positionId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        PositionService.getPositions().then((response) => {
            this.setState({positions: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <PositionAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <PositionEditForm position={this.state.positions.filter(
                                pos => {return pos.id === this.state.positionId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Positions Info</h1>
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
                            <td>Salary</td>
                            {/*<td>Employee</td>*/}
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.positions.map(
                            position =>
                                <tr key={position.id} className="pos-row" onClick={() => this.editingHandler(position.id)}>
                                    <td>{position.id}</td>
                                    <td>{position.name}</td>
                                    <td>{position.description}</td>
                                    <td>{position.salary}</td>
                                    {/*<td>{position.employee}</td>*/}
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Positions