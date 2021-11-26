const { Router } = require("./Router")
const router = new Router()

const { validate } = require('./validate')
const { create } = require('./crud')

// personMask {
//     'id': 'string',
//     'name': 'string',
//     'age': 'number',
//     'hobbies': 'arr'
// }

let persons = []


router.get('/persons', (req, res) => {
    res.send(persons)
})

router.get('/persons/', (req, res) => {
    const personId = req.personId
    if (persons.find(person => {
        person.id === personId
    }))
        res.send(req.body)
})
router.post('/persons/', async (req, res) => {
    const body = JSON.parse(req.body)
    await validate(body, res)
    persons = create(persons, body)
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(persons))
})


module.exports = router