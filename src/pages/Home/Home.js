import React from "react";
import Graph from "../../components/UI/Graph/Graph";
import Orders from "../Orders/Orders";

function Home() {
    return <div>
        <h2 className={"m-3"}>Home Page</h2>
        <h5 className={"ml-4 mt-3"}>Welcome to the main page of this autoservice web-application!</h5>
        <h5 className={"ml-4"}>Here you can add new orders and check for some statistics across employees.</h5>
        <hr />
        <Graph />
        <hr />
        <Orders />
    </div>
}

export default Home
