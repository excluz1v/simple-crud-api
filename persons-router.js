const { Router } = require("./Router")
const router = new Router()


const persons = {
    'id': '12345',
    'name': 'Petya',
    'age': '22',
    'hobbies': 'tennis'
}

router.get('/persons', (req, res) => {
    console.log(req.personId)
    res.send(persons)
})

router.post('/persons', (req, res) => {
    res.send(persons)
})

module.exports = router