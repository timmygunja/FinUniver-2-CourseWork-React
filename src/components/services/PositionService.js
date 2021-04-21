import axios from "axios";

const POSITIONS_REST_API_URL = "http://localhost:8080/api/positions"


class PositionService {
    getPositions() {
        return axios.get(POSITIONS_REST_API_URL)
    }
}

export default new PositionService()