const uuid = require('uuid');

const personKeys = ['name', 'age', 'hobbies']
const types = {
    name: 'string',
    age: 'number',
    hobbies: 'object'
}


async function validateTypes(body, res) {
    const bodyKeys = Object.keys(body)

    for (let key in body) {
        if (!personKeys.includes(key)) {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            return res.end(`Person object only contain's ${personKeys} properties`)

        } else if (!personKeys.every(el => bodyKeys.includes(el))) {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            return res.end(`Person object only contain's ${personKeys} properties`)

        } else if (typeof body[key] !== types[key] && key !== 'hobbies') {
            res.writeHead(400, {
                'Content-type': 'application/json'
            })
            return res.end(`Typeof ${key} must be ${types[key]}`)

        } else if (key === 'hobbies') {
            if (!Array.isArray(body[key])) {
                res.writeHead(400, {
                    'Content-type': 'application/json'
                })
                return res.end(`Typeof ${key} must be Array`)
            }
        }
    }
}

async function validateUUID(personId, res) {
    if (!uuid.validate(personId)) {
        res.writeHead(400, {
            'Content-type': 'application/json'
        })
        return res.end(`PersonId must be type of uuid`)
    }
}

async function validate(personId, res, persons) {
    await validateUUID(personId, res, persons)
    await isExist(personId, res, persons)
}

async function isExist(personId, res, persons) {
    if (!persons.find(person => person.id === personId)) {
        res.writeHead(404, {
            'Content-type': 'application/json'
        })
        return res.end(`person with id ${personId} is not exist`)

    }

}

module.exports = { validateTypes, validate }