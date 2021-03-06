import React from "react";
import "./Input.css"

const Input = (props) => {
    let inputElement = null

    switch (props.elementType) {
        case ( 'input' ):
            inputElement = <input
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={true} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={true} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className="InputElement"
                    value={props.value}
                    onChange={props.changed}
                    required={true}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={true} />;
    }

    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input