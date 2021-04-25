import React, {Component} from "react"
import '../../../App.css'
import './EmployeeForm.css'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import PositionService from "../../../components/services/PositionService";
import PrivilegeService from "../../../components/services/PrivilegeService";


class EmployeeEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    value: this.props.employee.name
                },
                surname: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Surname'
                    },
                    value: this.props.employee.surname
                },
                contact: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Contact'
                    },
                    value: this.props.employee.contact
                },
                login: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Login'
                    },
                    value: this.props.employee.login
                },
            }
        }
    }

    componentDidMount() {
        PositionService.getPositions().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    position: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                position => {
                                    position['value']=position.id;
                                    position['displayValue']=position.name;
                                    return position},
                            )
                        },
                        value: this.props.employee.position.id,
                        displayValue: this.props.employee.position.name
                    }
                }
            }));
        })

        PrivilegeService.getPrivileges().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    privilege: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                privilege => {
                                    privilege['value']=privilege.id;
                                    privilege['displayValue']=privilege.name;
                                    return privilege},
                            )
                        },
                        value: this.props.employee.privilege.id,
                        displayValue: this.props.employee.privilege.name
                    }
                }
            }));
        })
    }

    updateHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.employee.id
        for (let formElementIdentifier in this.state.addForm) {
            formData[formElementIdentifier] = this.state.addForm[formElementIdentifier].value;
        }

        formData["position"] = {id: this.state.addForm.position.value}
        formData["privilege"] = {id: this.state.addForm.privilege.value}

        axios.put( 'http://localhost:8080/api/employees', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );

        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    deleteHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.employee.id

        // eslint-disable-next-line no-useless-concat
        axios.delete( 'http://localhost:8080/api/employees' + '/' + formData['id'])
            .then( response => {
                this.setState( { loading: false } );
                // this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );

        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAddForm = {
            ...this.state.addForm
        };
        const updatedFormElement = {
            ...updatedAddForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedAddForm[inputIdentifier] = updatedFormElement;
        this.setState({addForm: updatedAddForm});
    }


    render () {
        const formElementsArray = [];
        for (let key in this.state.addForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button clicked={this.updateHandler} customClass="Success">Update</Button>
                <Button clicked={this.deleteHandler} customClass="Danger">Delete</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }

        return (
            <div className="FormData">
                <h4>Edit employee info</h4>
                {form}
            </div>
        );
    }
}

export default EmployeeEditForm;