const uuid = require('uuid');

const personKeys = ['name', 'age', 'hobbies']
const types = {
    name: 'string',
    age: 'number',
    hobbies: 'object'
}


function validateTypes(body, res) {
    const bodyKeys = Object.keys(body)
    for (key in body) {
        if (!personKeys.includes(key)) {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(JSON.stringify(`Person object only contain's ${personKeys} properties`))
            return false
        } else if (!personKeys.every(el => bodyKeys.includes(el))) {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(JSON.stringify(`Person object only contain's ${personKeys} properties`))
            return false
        } else if (typeof body[key] !== types[key] && key !== 'hobbies') {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            res.end(JSON.stringify(`Typeof ${key} must be ${types[key]}`))
            return false
        } else if (key === 'hobbies') {
            if (!Array.isArray(body[key])) {
                res.writeHead(400, {
                    'Content-type': 'application/json'
                })
                res.end(JSON.stringify(`Typeof ${key} must be Array`))
                return false
            }
        }
    }
    return true
}

function validateUUID(personId, res) {

    if (!uuid.validate(personId)) {

        res.writeHead(400, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(`PersonId must be type of uuid`))
        return false
    }
    return true
}

function isExist(personId, res, persons) {

    if (!persons.find(person => person.id === personId)) {
        res.writeHead(404, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(`person with id ${personId} is not exist`))
        return false
    }
    return true
}

module.exports = { validateTypes, isExist, validateUUID }