const personKeys = ['name', 'age', 'hobbies']

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
        }
    }
}