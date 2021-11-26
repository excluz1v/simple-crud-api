const { v4: uuidv4 } = require('uuid')

exports.create = function create(data) {
    return { "id": uuidv4(), ...data }
}