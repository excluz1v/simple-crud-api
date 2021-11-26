const personKeys = ['name', 'age', 'hobbies']
const types = {
    name: 'string',
    age: 'number',
    hobbies: 'object'
}

exports.validate = async function validate(body, res) {
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
