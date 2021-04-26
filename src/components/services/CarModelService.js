import axios from "axios";

const CARMODELS_REST_API_URL = "http://localhost:8080/api/car-models"


class CarModelService {
    getCarModels() {
        return axios.get(CARMODELS_REST_API_URL)
    }
}

export default new CarModelService()