import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Addresses {

    addAddressAndGetId(token) {
        const address1 = `Vancouver Street, ${Math.floor(Math.random() * 10000)}`
        const address2 = `Toronto Street, ${Math.floor(Math.random() * 10000)}`
        const city = "Vancouver"
        const state = "Britsh Columbia"
        const zip = Math.floor(Math.random() * 100)

        let response = http.post(`${Utils.getBaseUrl()}/addresses`, JSON.stringify(
            {
                "address_1": address1,
                "address_2": address2,
                "city": city,
                "state": state,
                "zip": zip
            }
        ), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return response.json('id')
    }
}
