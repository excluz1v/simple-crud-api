require('dotenv').config()
const Application = require('./classes/Application')
const personsRouter = require('./routes/persons-router')


const host = process.env.HOST
const port = process.env.PORT

const app = new Application()

// app.use(jsonParser)
app.addRouter(personsRouter)

app.listen(port, host, () => console.log(`Server is running on ${host}: ${port}`))



