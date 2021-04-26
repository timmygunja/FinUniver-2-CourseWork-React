import React from 'react';

import './Button.css';

const Button = (props) => (
    <button
        className={props.customClass}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;