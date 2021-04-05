import React, { Component } from "react"
import './App.css'
import Worker from "./Worker/Worker"
import WorkerForm from "./Worker/WorkerForm"


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
                {this.state.workers.map((worker, index) => {
                    return <Worker
                        key={worker.id}
                        name={worker.name}
                        lastName={worker.lastName}
                        click={() => this.deleteWorkerHandler(index)}
                        change={(event) => this.changeNameHandler(event, worker.id)}
                    />
                })}
            </div>
        );
    }
}

export default App;
