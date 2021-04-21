import axios from "axios";

const PRIVILEGES_REST_API_URL = "http://localhost:8080/api/privileges"


class PrivilegeService {
    getPrivileges() {
        return axios.get(PRIVILEGES_REST_API_URL)
    }
}

export default new PrivilegeService()