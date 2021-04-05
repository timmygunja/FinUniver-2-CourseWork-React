import React, {useState} from "react"
import '../App.css'
import './Worker.css'
import WorkerForm from "./WorkerForm";

const Worker = (props) => {


    return (
        <div className={'worker'}>
            <hr />
                <p onClick={props.click}>{props.name}</p>
                <p>{props.lastName}</p>
                <input type="text" onChange={props.change} value={props.name} />
            <hr />
        </div>
)
};

export default Worker;