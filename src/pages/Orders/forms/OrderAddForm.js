import React, {Component} from "react"
import "../../style.css"
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CarService from "../../../components/services/CarService";
import EmployeeService from "../../../components/services/EmployeeService";
import ServicesService from "../../../components/services/ServicesService";


class OrderAddForm extends Component {
    state = {
        loading: false,
        addForm: {
            isdone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job is done (true/false)',
                },
                value: ''
            },
            car: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
            },
            employee: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
            },
            services: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
            }
        }
    }

    componentDidMount() {
        CarService.getCars().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    car: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                    car => {
                                        car['value']=car.id;
                                        car['displayValue']=car.name;
                                        return car},
                                )
                        },
                        value: 1
                    }
                }
            }));
        })

        EmployeeService.getEmployees().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    employee: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                employee => {
                                    employee['value']=employee.id;
                                    employee['displayValue']=employee.name;
                                    return employee},
                            )
                        },
                        value: 1
                    }
                }
            }));
        })

        ServicesService.getServices().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    services: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                services => {
                                    services['value']=services.id;
                                    services['displayValue']=services.name;
                                    return services},
                            )
                        },
                        value: 1
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

        formData["car"] = {id: this.state.addForm.car.value}
        formData["employee"] = {id: this.state.addForm.employee.value}
        formData["services"] = {id: this.state.addForm.services.value}

        axios.post( 'http://localhost:8080/api/orders', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/orders' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );

        window.location.reload()
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
            <form onSubmit={this.formHandler} >
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
                <h4>Enter order info</h4>
                {form}
            </div>
        );
    }
}

export default OrderAddForm;