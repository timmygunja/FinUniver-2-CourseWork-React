import React from 'react';

import classes from './Button.css';

const Button = (props) => (
    <Button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</Button>
);

export default Button;