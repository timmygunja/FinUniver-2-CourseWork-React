import React, {Component} from "react"
import '../../../App.css'
import './CarBrandForm.css'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import CarBrandService from "../../../components/services/CarBrandService";


class CarBrandEditForm extends Component {
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
                    value: this.props.carbrand.name
                },
                description: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Description'
                    },
                    value: this.props.carbrand.description
                },
                image: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Image'
                    },
                    value: this.props.carbrand.image
                },
            }
        }
    }

    updateHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.carbrand.id
        for (let formElementIdentifier in this.state.addForm) {
            formData[formElementIdentifier] = this.state.addForm[formElementIdentifier].value;
        }

        axios.put( 'http://localhost:8080/api/car-brands', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/car-brands' );
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
        formData['id'] = this.props.carbrand.id

        // eslint-disable-next-line no-useless-concat
        axios.delete( 'http://localhost:8080/api/car-brands' + '/' + formData['id'])
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/car-brands' );
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
                <h4>Edit car brand info</h4>
                {form}
            </div>
        );
    }
}

export default CarBrandEditForm;