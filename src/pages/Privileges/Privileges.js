import React, {Component} from "react"
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import "./Privileges.css"
import PrivilegeAddForm from "./forms/PrivilegeAddForm";
import PrivilegeEditForm from "./forms/PrivilegeEditForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import PrivilegeService from "../../components/services/PrivilegeService";

class Privileges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privileges: []
        }
    }

    state = {
        adding: false,
        editing: false,
        privilegeId: null,
    }

    addingHandler = () => {
        this.setState({adding:true})
    }

    addingCancelHandler = () => {
        this.setState({adding:false})
    }

    editingHandler = (id) => {
        this.setState({
            privilegeId: id,
            editing: true
        })
    }

    editingCancelHandler = () => {
        this.setState({editing: false})
    }

    componentDidMount() {
        PrivilegeService.getPrivileges().then((response) => {
            this.setState({privileges: response.data})
        })
    }


    render() {
        return (
            <Aux>
                <Modal show={this.state.adding} modalClosed={this.addingCancelHandler}>
                    <PrivilegeAddForm />
                </Modal>

                <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                    {
                        this.state.editing ?
                            <PrivilegeEditForm privilege={this.state.privileges.filter(
                                priv => {return priv.id === this.state.privilegeId})[0]} />
                        : <Spinner />
                    }
                </Modal>

                <div className="form-top">
                    <h1 className="form-title">Privileges Info</h1>
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
                            {/*<td>Employee</td>*/}
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.privileges.map(
                            privilege =>
                                <tr key={privilege.id} className="priv-row" onClick={() => this.editingHandler(privilege.id)}>
                                    <td>{privilege.id}</td>
                                    <td>{privilege.name}</td>
                                    {/*<td>{privilege.employee}</td>*/}
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </Aux>
        )
    }
}

export default Privileges