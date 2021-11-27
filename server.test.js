const supertest = require('supertest')
const Application = require('./src/classes/Application')
const personsRouter = require('./src/routes/persons-router')
const extendMatchers = require('jest-extended');
expect.extend(extendMatchers);

const app = new Application()
const server = app.server
const host = process.env.HOST
const port = process.env.PORT

app.addRouter(personsRouter)

app.listen(port, host, () => { })

describe('first scenario', () => {
    // 1.	GET-запросом получаем все объекты (ожидается пустой массив)
    // 2.	POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)
    // 3.	GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)
    // 4.	PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)
    // 5.	DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)
    // 6.	GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)


    const request = supertest(server)

    test('/person return empty array', async () => {
        const response = await request.get('/person');
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([])
    })
    test('/person return empty array', async () => {
        const response = await request.post('/person').send({
            "name": "Vasya",
            "age": 353,
            "hobbies": ["qwe"]
        });
        expect(response.statusCode).toBe(201)
        expect(response.body).toContainValues(["Vasya", 353, ["qwe"]])
        expect(response.body).toContainAllKeys(["name", 'age', 'hobbies', 'id'])
    })

    server.close()
})