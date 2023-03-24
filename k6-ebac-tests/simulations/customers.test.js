import { group } from 'k6';
import Login from '../requests/login.request';
import data from '../data/users.json'
import Customers from '../requests/customers.request';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(90) < 1000']
    }
}

export default function () {

    let login = new Login()
    let customers = new Customers()

    const email = `lg.c${Math.floor(Math.random() * 10000)}@test.com`
    const firstname = `${Math.floor(Math.random() * 10000)} - lg`
    const lastname = `${Math.floor(Math.random() * 10000)} - cc`
    const phone = `${Math.floor(Math.random() * 10000)}`

    const token = login.accessAndGetToken(data.usuarioOk.user, data.usuarioOk.password)
    let customerId = customers.addACustumerAndGetId(token, email, firstname, lastname, phone)

    group('add a customer', () => {
        customers.addACustumer(token, email, firstname, lastname, phone)
    })

    group('list addresses', () => {
        customers.listAddresses(token)
    })

    group('list specific customer', () => {
        customers.listSpecificCustomer(token, customerId)
    })

    group('edit a customer', () => {
        let editedEmail = `patch${email}`
        let editedName = `[patch] ${firstname}`

        customers.editACustomer(token, editedEmail, editedName, lastname, phone, customerId)
    })
}
