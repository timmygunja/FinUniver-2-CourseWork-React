import React, {Component} from "react"
import "../../style.css"
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CarService from "../../../components/services/CarService";
import CustomerService from "../../../components/services/CustomerService";


class CarAddForm extends Component {
    state = {
        loading: false,
        addForm: {
            plate: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Plate number',
                },
                value: ''
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description',
                },
                value: ''
            },
            carmodel: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
            },
            customer: {
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
                    carmodel: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                carmodel => {
                                    carmodel['value']=carmodel.id;
                                    carmodel['displayValue']=carmodel.name;
                                        return carmodel},
                                )
                        },
                        value: 1
                    }
                }
            }));
        })

        CustomerService.getCustomers().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    customer: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                customer => {
                                    customer['value']=customer.id;
                                    customer['displayValue']=customer.name;
                                    return customer},
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

        formData["carmodel"] = {id: this.state.addForm.carmodel.value}
        formData["customer"] = {id: this.state.addForm.customer.value}

        axios.post( 'http://localhost:8080/api/cars', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/cars' ); // doesn't work ?
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
                <h4>Enter car info</h4>
                {form}
            </div>
        );
    }
}

export default CarAddForm;