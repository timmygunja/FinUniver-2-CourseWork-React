import React, { Component } from 'react';

import './Modal.css';
import Aux from "../../../hoc/Aux/Aux";
// import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    render () {
        return (
            <Aux>
                <div className="Modal">
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;