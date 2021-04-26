import axios from "axios";

const CARBRANDS_REST_API_URL = "http://localhost:8080/api/car-brands"


class CarBrandService {
    getCarBrands() {
        return axios.get(CARBRANDS_REST_API_URL)
    }
}

export default new CarBrandService()