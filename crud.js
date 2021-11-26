const { v4: uuidv4 } = require('uuid')

exports.create = function create(arr, data) {
    return arr = [...arr, { "id": uuidv4(), ...data }]
}
