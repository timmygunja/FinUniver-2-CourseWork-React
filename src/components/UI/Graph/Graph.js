import React, {Component} from "react";
import {
    MainContainer,
    Container,
    BarChartContainer,
    Number,
    BlackLine,
    MakeBar
} from "./styles";
import EmployeeService from "../../services/EmployeeService";
import OrderService from "../../services/OrderService";


class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            data: []
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState({employees: response.data})

            this.state.employees.map(
                emp => {

                    let count = 0

                    OrderService.getOrders().then((response) => {
                        const lst = response.data

                        for (var i = 0; i < lst.length; i++) {
                            // eslint-disable-next-line no-unused-expressions
                            emp.surname === lst[i].employee.surname ? count++ : null
                        }

                        this.setState((prevState, props) => ({
                            data: [
                                ...prevState.data,
                                {
                                    name: emp.surname,
                                    jobs: count,
                                    colors: ["#52d98d", "#1da890"]
                                }
                            ]
                        }))

                    })
                    return null
                }
            )

        })
    }

    render() {
        return (
            <Container>
                <MainContainer>
                    {this.state.data.map(({name, jobs, colors }, i) => {
                        return (
                            <BarChartContainer key={i}>
                                <Number color={colors[1]}>{name} {jobs}</Number>
                                <MakeBar height={jobs * 4} colors={colors} />
                            </BarChartContainer>
                        );
                    })}
                </MainContainer>
                <BlackLine />
                <h5 className={"text-center m-4 text-black-60"}>Number of orders completed</h5>
            </Container>
        );
    }
}


export default Graph