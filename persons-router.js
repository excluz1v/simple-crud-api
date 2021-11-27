const { Router } = require("./Router")
const router = new Router()

const { validateTypes, isExist, validateUUID } = require('./validate')
const { create, del, update } = require('./crud')
let persons = require("./persons")


// personMask {
//     'id': 'string',
//     'name': 'string',
//     'age': 'number',
//     'hobbies': 'arr'
// }



router.get('/person', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(persons))
})

router.get('/person/', (req, res) => {
    const personId = req.personId
    if (!validateUUID(personId, res)) return false
    if (!isExist(personId, res, persons)) return false

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
    if (!validateTypes(body, res)) return false
    const newPerson = create(body)
    persons = [...persons, newPerson]
    res.writeHead(201, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(newPerson))
})

router.delete('/person/', async (req, res) => {
    const personId = req.personId
    if (!validateUUID(personId, res)) return false
    if (!isExist(personId, res, persons)) return false

    persons = del(personId, persons)

    res.writeHead(204, {
        'Content-type': 'application/json'
    })
    res.end()
})

router.put('/person/', async (req, res) => {
    const personId = req.personId
    const body = JSON.parse(req.body)

    if (!validateTypes(body, res)) return false
    if (!validateUUID(personId, res)) return false
    if (!isExist(personId, res, persons)) return false

    const [updatedPersons, newPerson] = update(body, personId, persons)
    persons = updatedPersons
    res.writeHead(201, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(newPerson))
})

module.exports = router