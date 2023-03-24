import { group } from 'k6';
import Login from '../requests/login.request';
import data from '../data/users.json'
import Products from '../requests/products.request';

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
    let products = new Products()

    const productNumber = Math.floor(Math.random() * 10000)
    const description = `product-${productNumber} description`
    const price = Math.floor(Math.random() * 100)
    const name = `product-${productNumber}`

    const token = login.accessAndGetToken(data.usuarioOk.user, data.usuarioOk.password)
    let productId = products.addProductAndGetProductId(token, description, price, name)

    group('add a product', () => {
        products.addProduct(token, description, price, name)
    })

    group('list products', () => {
        products.listProducts(token)
    })

    group('list specific product', () => {
        products.listSpecificProduct(token, productId)
    })

    group('edit a product', () => {
        let editedDescription = `[patch] ${description}`
        let editedName = `[patch] ${name}`

        products.editAProduct(token, editedDescription, price, editedName, productId)
    })

    // group('delete a product', () => {
    //     products.deleteAProduct(token, productId)
    // })
}
