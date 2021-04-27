import React, {Component} from "react"
import '../../../App.css'
import "../../style.css"
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CarBrandService from "../../../components/services/CarBrandService";


class CarModelAddForm extends Component {
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
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Description'
                },
                value: ''
            },
            carbrand: {
                elementType: 'select',
                elementConfig: {
                    options: []
                }
            }
        }
    }

    componentDidMount() {
        CarBrandService.getCarBrands().then((response) => {
            this.setState((prevState, props) => ({
                addForm: {
                    ...prevState.addForm,
                    carbrand: {
                        elementType: 'select',
                        elementConfig: {
                            options: response.data.map(
                                carbrand => {
                                    carbrand['value'] = carbrand.id;
                                    carbrand['displayValue'] = carbrand.name;
                                    return carbrand
                                },
                            )
                        },
                        value: 1
                    }
                },
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

        formData["carbrand"] = {id: this.state.addForm.carbrand.value}

        axios.post( 'http://localhost:8080/api/car-models', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/car-models' );
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
                <h4>Enter car model info</h4>
                {form}
            </div>
        );
    }
}

export default CarModelAddForm;