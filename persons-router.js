const { Router } = require("./Router")
const router = new Router()

const { validatePOST, validateGET } = require('./validate')
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

router.get('/person/', async (req, res) => {
    const personId = req.personId
    await validateGET(personId, res)

    if (persons.find(person => person.id === personId)) {
        const person = persons.find(person => person.id === personId)
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(person))
    } else {
        res.writeHead(404, {
            'Content-type': 'application/json'
        })
        res.end(`person with id ${personId} is not exist`)
    }

})
router.post('/person', async (req, res) => {
    const body = JSON.parse(req.body)
    await validatePOST(body, res)
    const newperson = create(body)
    persons = [...persons, newperson]
    res.writeHead(201, {
        'Content-type': 'application/json'
    })
    res.end(JSON.stringify(newperson))
})


module.exports = router