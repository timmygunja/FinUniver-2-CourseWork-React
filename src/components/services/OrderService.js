import axios from "axios";

const ORDERS_REST_API_URL = "http://localhost:8080/api/orders"


class OrderService {
    getOrders() {
        return axios.get(ORDERS_REST_API_URL)
    }
}

export default new OrderService()