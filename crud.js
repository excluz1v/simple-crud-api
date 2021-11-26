const { v4: uuidv4 } = require('uuid')


exports.create = function create(data) {
    return { "id": uuidv4(), ...data }
}

exports.del = function del(id, persons) {
    return persons.filter(person => person.id !== id)
}