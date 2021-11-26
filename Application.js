const http = require("http")
const EventEmitter = require('events')
const bodyParser = require('./bodyParser')
const URLParser = require("./URLParser")


module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = []
    }

    listen(port, host, callback) {
        this.server.listen(port, host, callback)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    addRouter(router) {
        //  endpoints ={
        //     '/persons':{
        //         "GET":handler1,
        //         "POST":handler2,
        //         "DELETE":handler3
        //     }
        // }

        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    handler(req, res)
                })
            })

        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.use(bodyParser)
            this.use(URLParser('http://localhost:8000'))
            this.middlewares.forEach(middleware => middleware(req, res))
            const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)
            if (!emitted) {
                res.end()
            }
        })
    }
    _getRouteMask(path, method) {
        return `[${path}}]:[${method}]`
    }
}