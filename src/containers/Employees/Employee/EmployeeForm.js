import React, {useState} from "react"
import '../../../App.css'

const EmployeeForm = () => {
    const [data, setData] = useState({
        name: "",
        password: "",
    });

    const onChangeName = (e) => {
        setData(
            {...data, name: e.target.value}
        )
        console.log(data.name)
    }

    const onChangePassword = (e) => {
        setData(
            {...data, password: e.target.value}
        )
        console.log(data.password)
    }



    return(
    <div>
        <input value={data.name} placeholder={'name'} onChange={onChangeName}/>
        <input value={data.password} placeholder={'password'} onChange={onChangePassword}/>
        <button onClick={()=>{alert('qq')}}>send</button>
    </div>
    )
};

export default EmployeeForm;