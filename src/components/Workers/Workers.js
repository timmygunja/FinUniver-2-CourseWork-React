import Worker from "./Worker/Worker";

const Workers = (props) => props.workers.map((worker, index) => {
            return <Worker
                key={worker.id}
                name={worker.name}
                lastName={worker.lastName}
                click={() => props.clicked(index)}
                change={(event) => props.changed(event, worker.id)}
            />
        })

export default Workers