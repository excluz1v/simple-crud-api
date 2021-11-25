const http = require("http")
const { Router, emitter } = require("./Router")

const host = "localhost"
const port = "8000"
const router = new Router()

function requestListener(req, res) {

    const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res)

    if (!emitted) {
        res.end()
    }
    // res.writeHead(200, { "Content-Type": "application/json" })
}

router.get('/users', (req, res) => {
    res.end('YOU SEND REQUEST TO /USERS')
})
router.get('/posts', (req, res) => {
    res.end('YOU SEND REQUEST TO /posts')
})

const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`Server is running on ${host}: ${port}`)
})