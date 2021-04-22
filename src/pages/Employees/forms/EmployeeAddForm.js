import React, {Component} from "react"
import '../../../App.css'
import "./EmployeeAddForm.css"
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import PositionService from "../../../components/services/PositionService";
import PrivilegeService from "../../../components/services/PrivilegeService";


class EmployeeAddForm extends Component {
    state = {
        loading: false,
        addForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: ''
            },
            surname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Surname'
                },
                value: ''
            },
            contact: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact'
                },
                value: ''
            },
            login: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Login'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: ''
            },
            position: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: ''
            },
            privilege: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
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
                                    position['value']=position;
                                    position['displayValue']=position.name;
                                    return position},
                                )
                        },
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
                                    privilege['value']=privilege;
                                    privilege['displayValue']=privilege.name;
                                    return privilege},
                            )
                        },
                    }
                }
            }));
        })
    }

    formHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.addForm) {
            formData[formElementIdentifier] = this.state.addForm[formElementIdentifier].value;
        }

        console.log(formData)

        axios.post( 'http://localhost:8080/api/employees', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/employees' ); // doesn't work ?
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );

        // eslint-disable-next-line no-restricted-globals
        // location.reload()
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
            <form onSubmit={this.formHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button customClass="Success">Add</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className="FormData">
                <h4>Enter employee info</h4>
                {form}
            </div>
        );
    }
}

export default EmployeeAddForm;