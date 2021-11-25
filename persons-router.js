const { Router } = require("./Router")
const router = new Router()


const persons = {
    'id': '12345',
    'name': 'Petya',
    'age': '22',
    'hobbies': 'tennis'
}

router.get('/persons', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(persons))
})

module.exports = router