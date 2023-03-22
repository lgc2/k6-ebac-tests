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

    addProductAndGetProductId(token, description, itemPrice, name) {
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
        return response.json('id')
    }

    listSpecificProduct(token, productId) {
        let response = http.get(`${Utils.getBaseUrl()}/products/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        check(response, { 'produto listado deve retornar 200': r => r && r.status === 200 })
    }

    editAProduct(token, description, itemPrice, name, productId) {
        let response = http.patch(`${Utils.getBaseUrl()}/products/${productId}`, JSON.stringify(
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
        check(response, { 'edição deve retornar 200': r => r && r.status === 200 })
    }

    deleteAProduct(token, productId) {
        let response = http.del(`${Utils.getBaseUrl()}/products/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "accept": "application/json"
                }
            })
        check(response, { 'deleção deve retornar 200': r => r && r.status === 200 })
    }
}