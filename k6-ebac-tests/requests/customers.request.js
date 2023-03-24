import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"
import Addresses from "./addresses.request"

export default class Customers {

    getAddressId(token) {
        let adresses = new Addresses()
        return adresses.addAddressAndGetId(token)
    }


    addACustumer(token, email, firstName, lastName, phone) {
        let response = http.post(`${Utils.getBaseUrl()}/customers`, JSON.stringify(
            {
                "address": {
                    "id": this.getAddressId(token)
                },
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone
            }
        ), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        check(response, { 'inclusão de Cliente deve retornar 201': r => r && r.status === 201 })
    }

    addACustumerAndGetId(token, email, firstName, lastName, phone) {
        let response = http.post(`${Utils.getBaseUrl()}/customers`, JSON.stringify(
            {
                "address": {
                    "id": this.getAddressId(token)
                },
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone
            }
        ), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return response.json('id')
    }

    listAddresses(token) {
        let response = http.get(`${Utils.getBaseUrl()}/customers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        check(response, { 'listagem de Clientes deve retornar 200': r => r && r.status === 200 })
    }

    listSpecificCustomer(token, customerId) {
        let response = http.get(`${Utils.getBaseUrl()}/customers/${customerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        check(response, { 'Cliente listado deve retornar 200': r => r && r.status === 200 })
    }

    editACustomer(token, email, firstName, lastName, phone, customerId) {
        let response = http.patch(`${Utils.getBaseUrl()}/customers/${customerId}`, JSON.stringify(
            {
                "address": {
                    "id": this.getAddressId(token)
                },
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone
            }
        ), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        check(response, { 'edição de Cliente deve retornar 200': r => r && r.status === 200 })
    }
}
