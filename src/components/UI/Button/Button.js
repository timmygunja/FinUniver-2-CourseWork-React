import React from 'react';

import './Button.css';
import '../../../pages/Employees.css'

const Button = (props) => (
    <button
        className={props.customClass}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;