import axios from "axios";

const EMPLOYEE_REST_API_URL = "http://localhost:8080/api/employees"


class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEE_REST_API_URL)
    }
}

export default new EmployeeService()