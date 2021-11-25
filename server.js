const Application = require('./Application')
const personsRouter = require('./persons-router')


const host = "localhost"
const port = "8000"

const app = new Application()

app.addRouter(personsRouter)

app.listen(port, host, () => console.log(`Server is running on ${host}: ${port}`))




