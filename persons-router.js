const { Router } = require("./Router")
const router = new Router()

const { validatePOST, validate } = require('./validate')
const { create, del } = require('./crud')
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

router.get('/person/', async (req, res) => {
    const personId = req.personId
    await validate(personId, res, persons)
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
    await validatePOST(body, res)
    const newPerson = create(body)
    persons = [...persons, newPerson]
    res.writeHead(201, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(newPerson))
})

router.delete('/person/', async (req, res) => {
    const personId = req.personId
    await validate(personId, res, persons)
    persons = del(personId, persons)

    res.writeHead(204, {
        'Content-type': 'application/json'
    })
    res.end()
})


module.exports = router