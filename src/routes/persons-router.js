const { Router } = require("../classes/Router")
const router = new Router()

const { validateTypes, isExist, validateUUID } = require('../validate/validate')
const { create, del, update } = require('../crud')
let persons = require("../persons")

// personMask {
//     'id': 'string',
//     'name': 'string',
//     'age': 'number',
//     'hobbies': 'arr'
// }

router.get('/person', async (req, res) => {
    try {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(persons))
    } catch (err) {
        res.writeHead(500)
        res.end(err)
    }

})

router.get('/person/', (req, res) => {
    try {
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
    } catch (err) {
        res.writeHead(500)
        res.end(err)
    }
})

router.post('/person', async (req, res) => {

    try {
        const body = JSON.parse(req.body)
        if (!validateTypes(body, res)) return false
        const newPerson = create(body)
        persons = [...persons, newPerson]
        res.writeHead(201, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(newPerson))
    } catch (err) {
        res.writeHead(500)
        res.end(err)
    }

})

router.delete('/person/', async (req, res) => {
    try {
        const personId = req.personId
        if (!validateUUID(personId, res)) return false
        if (!isExist(personId, res, persons)) return false

        persons = del(personId, persons)

        res.writeHead(204, {
            'Content-type': 'application/json'
        })
        res.end()
    } catch (err) {
        res.writeHead(500)
        res.end(err)
    }
})

router.put('/person/', async (req, res) => {
    try {
        const personId = req.personId
        const body = JSON.parse(req.body)

        if (!validateTypes(body, res)) return false
        if (!validateUUID(personId, res)) return false
        if (!isExist(personId, res, persons)) return false

        const [updatedPersons, newPerson] = update(body, personId, persons)
        persons = updatedPersons
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(newPerson))
    } catch (err) {
        res.writeHead(500)
        res.end(err)
    }

})

module.exports = router