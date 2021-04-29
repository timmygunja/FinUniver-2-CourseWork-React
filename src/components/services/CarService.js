import axios from "axios";

const CARS_REST_API_URL = "http://localhost:8080/api/cars"


class CarService {
    getCars() {
        return axios.get(CARS_REST_API_URL)
    }
}

export default new CarService()