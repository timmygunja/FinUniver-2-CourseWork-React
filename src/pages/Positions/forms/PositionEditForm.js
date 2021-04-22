import React, {Component} from "react"
import '../../../App.css'
import './PositionForm.css'
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";


class PositionEditForm extends Component {
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
                    value: this.props.position.name
                },
                description: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Description'
                    },
                    value: this.props.position.description
                },
                salary: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Salary'
                    },
                    value: this.props.position.salary
                },
                // employee: {
                //     elementType: 'input',
                //     elementConfig: {
                //         type: 'text',
                //         placeholder: 'Employee'
                //     },
                //     value: this.props.position.employee
                // },
            }
        }
    }


    updateHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        formData['id'] = this.props.position.id
        for (let formElementIdentifier in this.state.addForm) {
            formData[formElementIdentifier] = this.state.addForm[formElementIdentifier].value;
        }

        axios.put( 'http://localhost:8080/api/positions', formData)
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/positions' );
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
        formData['id'] = this.props.position.id

        // eslint-disable-next-line no-useless-concat
        axios.delete( 'http://localhost:8080/api/positions' + '/' + formData['id'])
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/positions' );
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
                <h4>Edit position info</h4>
                {form}
            </div>
        );
    }
}

export default PositionEditForm;