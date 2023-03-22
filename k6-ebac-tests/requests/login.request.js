import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Login {
    #token

    access(user, password) {
        let response = http.post(`${Utils.getBaseUrl()}/login`, JSON.stringify(
            {
                "username": user,
                "password": password
            }
        ), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        this.#token = response.json('accessToken')
        check(response, {
            "login deve retornar 201": (r) => r.status === 201
        })
    }

    getToken() {
        return this.#token
    }

    accessAndGetToken(user, password) {
        this.access(user, password)
        return this.#token
    }
}