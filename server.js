const http = require('http')

const host = "localhost"
const port = "8000"

function requestListener(req, res) {
    res.setHeader('Content-Type', 'appliction/json')
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`Server is running on ${host}: ${port}`)
})