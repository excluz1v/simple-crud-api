const Application = require('./Application')
const { Router, emitter } = require("./Router")

const host = "localhost"
const port = "8000"
const router = new Router()
const app = new Application()

app.listen(port, host, () => console.log(`Server is running on ${host}: ${port}`))

router.get('/users', (req, res) => {
    res.end('YOU SEND REQUEST TO /USERS')
})
router.get('/posts', (req, res) => {
    res.end('YOU SEND REQUEST TO /posts')
})

app.addRouter(router)
