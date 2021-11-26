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


router.get('/person', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(persons))
})

router.get('/person/', (req, res) => {
    const personId = req.personId
    if (persons.find(person => person.id === personId)) {
        const person = persons.find(person => person.id === personId)
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(person))
    }

})
router.post('/person', async (req, res) => {
    const body = JSON.parse(req.body)
    await validate(body, res)
    const newperson = create(body)
    persons = [...persons, newperson]
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(newperson))
})


module.exports = router