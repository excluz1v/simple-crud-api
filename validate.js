const uuid = require('uuid');

const personKeys = ['name', 'age', 'hobbies']
const types = {
    name: 'string',
    age: 'number',
    hobbies: 'object'
}

async function validatePOST(body, res) {
    const bodyKeys = Object.keys(body)
    for (let key in body) {
        if (!personKeys.includes(key)) {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(`Person object only contain's ${personKeys} properties`)
            return false
        } else if (!personKeys.every(el => bodyKeys.includes(el))) {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(`Person object only contain's ${personKeys} properties`)
            return false
        } else if (typeof body[key] !== types[key] && key !== 'hobbies') {

            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(`Typeof ${key} must be ${types[key]}`)
            return false
        } else if (key === 'hobbies') {
            if (!Array.isArray(body[key])) {
                res.writeHead(400, {
                    'Content-type': 'application/json'
                })
                res.end(`Typeof ${key} must be Array`)
                return false
            }
        }
    }
}

async function validateUUID(personId, res) {
    if (!uuid.validate(personId)) {
        res.writeHead(400, {
            'Content-type': 'application/json'
        })
        res.end(`PersonId must be type of uuid`)
        return false
    }
    return true
}

async function validate(personId, res, persons) {
    await validateUUID(personId, res, persons)
    await isExist(personId, res, persons)
    return true
}

async function isExist(personId, res, persons) {
    if (!persons.find(person => person.id === personId)) {
        res.writeHead(404, {
            'Content-type': 'application/json'
        })
        res.end(`person with id ${personId} is not exist`)
        return false
    }
    return true
}

module.exports = { validatePOST, validate }