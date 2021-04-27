import React, {Component} from "react"
import '../../../App.css'
import "../../style.css"
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import CarBrandService from "../../../components/services/CarBrandService";


class CarModelEditForm extends Component {
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
                    value: this.props.carmodel.name
                },
                description: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Description'
                    },
                    value: this.props.carmodel.description
                },
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
                        value: this.props.carmodel.carbrand.id,
                        displayValue: this.props.carmodel.carbrand.name
                    }
                }
            }));
        })
    }

    updateHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.carmodel.id
        for (let formElementIdentifier in this.state.addForm) {
            formData[formElementIdentifier] = this.state.addForm[formElementIdentifier].value;
        }

        formData["carbrand"] = {id: this.state.addForm.carbrand.value}

        axios.put( 'http://localhost:8080/api/car-models', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/car-models' );
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
        formData['id'] = this.props.carmodel.id

        // eslint-disable-next-line no-useless-concat
        axios.delete( 'http://localhost:8080/api/car-models' + '/' + formData['id'])
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
                <h4>Edit car model info</h4>
                {form}
            </div>
        );
    }
}

export default CarModelEditForm;