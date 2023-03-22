import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Products {

    addProduct(token, description, itemPrice, name) {
        let response = http.post(`${Utils.getBaseUrl()}/products`, JSON.stringify(
            {
                "description": description,
                "itemPrice": itemPrice,
                "name": name
            }
        ), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        check(response, { 'inclusão deve retornar 201': r => r && r.status === 201 })
    }

    listProducts(token) {
        let response = http.get(`${Utils.getBaseUrl()}/products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        check(response, { 'listagem de produtos deve retornar 200': r => r && r.status === 200 })
    }
}