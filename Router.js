//  endpoints ={
//     '/persons':{
//         "GET":handler1,
//         "POST":handler2,
//         "DELETE":handler3
//     }
// }

const EventEmitter = require('events')
const emitter = new EventEmitter()

class Router {
    constructor() {
        this.endpoints = {}
    }
    async request(method = 'GET', path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path]

        if (endpoint[method]) {
            throw new Error(`${method} по адресу ${path} уже существует`)
        }

        //MASK [path]:[method]
        endpoint[method] = handler
    }

    async get(path, handler) {
        await this.request('GET', path, handler)
    }
    async post(path, handler) {
        await this.request('POST', path, handler)
    }
    async put(path, handler) {
        await this.request('PUT', path, handler)
    }
    async delete(path, handler) {
        await this.request('DELETE', path, handler)
    }
}

module.exports = {
    Router
}