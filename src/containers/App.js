import React, { Component } from "react"
import './App.css'
import Workers from "../components/Workers/Workers";
import Worker from "../components/Workers/Worker/Worker"
import WorkerForm from "../components/Workers/Worker/WorkerForm"


class App extends Component {
    state = {
        workers: [
            {id: 1, name: 'Max', lastName: 'Payne'},
            {id: 2, name: 'Ivan', lastName: 'Ivanov'},
            {id: 3, name: 'Petr', lastName: 'Petrov'},
        ]
    }

    // usernameChangedHandler = (e) => {
    //     this.setState({username: e.target.value})
    // }

    changeNameHandler = (event, id) => {
        const workerIndex = this.state.workers.findIndex(w => {return w.id === id})

        const worker = {
            ...this.state.workers[workerIndex]
        }

        worker.name = event.target.value

        const workers = [...this.state.workers]
        workers[workerIndex] = worker

        this.setState({workers: workers})
    }

    deleteWorkerHandler = (workerIndex) => {
        const workers = [...this.state.workers]
        workers.splice(workerIndex,1)
        this.setState({workers: workers})
    }

    render() {
        return (
            <div>
                <Workers
                    workers={this.state.workers}
                    clicked={this.deleteWorkerHandler}
                    changed={this.changeNameHandler}
                />
            </div>
        );
    }
}

export default App;
