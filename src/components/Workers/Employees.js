import Employee from "./Worker/Employee";

const Employees = (props) => props.workers.map((employee, index) => {
            return <Employee
                key={employee.id}
                name={employee.name}
                lastName={employee.lastName}
                click={() => props.clicked(index)}
                change={(event) => props.changed(event, employee.id)}
            />
        })

export default Employees