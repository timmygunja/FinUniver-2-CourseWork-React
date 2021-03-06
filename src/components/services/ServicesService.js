import axios from "axios";

const SERVICES_REST_API_URL = "http://localhost:8080/api/services"


class ServicesService {
    getServices() {
        return axios.get(SERVICES_REST_API_URL)
    }
}

export default new ServicesService()