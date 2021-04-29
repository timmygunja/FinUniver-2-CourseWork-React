import React, {Component} from "react"
import "../../style.css"
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import CarModelService from "../../../components/services/CarModelService";
import CustomerService from "../../../components/services/CustomerService";



class CarEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addForm: {
                plateNumber: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Plate number'
                    },
                    value: this.props.car.plateNumber
                },
                description: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Description'
                    },
                    value: this.props.car.description
                },
            }
        }
    }

    componentDidMount() {
        CarModelService.getCarModels().then((response) => {
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
                        value: this.props.car.carmodel.id,
                        displayValue: this.props.car.carmodel.name
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
                        value: this.props.car.customer.id,
                        displayValue: this.props.car.customer.surname
                    }
                }
            }));
        })
    }

    updateHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.car.id
        for (let formElementIdentifier in this.state.addForm) {
            formData[formElementIdentifier] = this.state.addForm[formElementIdentifier].value;
        }

        formData["carmodel"] = {id: this.state.addForm.carmodel.value}
        formData["customer"] = {id: this.state.addForm.customer.value}

        axios.put( 'http://localhost:8080/api/cars', formData)
            .then( response => {
                this.setState( { loading: false } );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );

        window.location.reload()
    }

    deleteHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.car.id

        // eslint-disable-next-line no-useless-concat
        axios.delete( 'http://localhost:8080/api/cars' + '/' + formData['id'])
            .then( response => {
                this.setState( { loading: false } );
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
                <h4>Edit car info</h4>
                {form}
            </div>
        );
    }
}

export default CarEditForm;