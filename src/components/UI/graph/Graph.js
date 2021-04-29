import React from "react";
import { __DATA__ } from "./data";
import {
    MainContainer,
    Container,
    BarChartContainer,
    Number,
    BlackLine,
    MakeBar
} from "./styles";

export default function App() {
    return (
        <Container>
            <MainContainer>
                {__DATA__.map(({name, jobs, colors }, i) => {
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