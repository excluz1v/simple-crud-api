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
    // 1.	GET-запросом получаем все объекты (ожидается пустой массив)
    test('GET /person return empty array', async () => {
        const response = await request.get('/person');
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([])
    })
    // 2.	POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)
    let newPerson
    test("POST /person return new object with ['name', 'age', 'hobbies', 'id'] properties ", async () => {
        const response = await request.post('/person').send({
            "name": "Vasya",
            "age": 353,
            "hobbies": ["football"]
        });
        newPerson = response.body

        expect(response.statusCode).toBe(201)
        expect(response.body).toContainValues(["Vasya", 353, ["football"]])
        expect(response.body).toContainAllKeys(["name", 'age', 'hobbies', 'id'])

    })

    // 3.	GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)
    test('GET /person/:id return person object', async () => {

        const response = await request.get(`/person/${newPerson.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(newPerson)
    })

    // 4.	PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)

    test('PUT /person/:id return person updated object', async () => {
        const updatedInfo = {
            "name": "Petya",
            "age": 111,
            "hobbies": ["tennis"]
        }

        const response = await request.put(`/person/${newPerson.id}`).send(updatedInfo);
        newPerson = { ...newPerson, ...updatedInfo }

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(newPerson)
    })

    // 5.	DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)

    test('DELETE /person/:id return 204 status', async () => {

        const response = await request.delete(`/person/${newPerson.id}`);
        expect(response.statusCode).toBe(204)
    })

    // 6.	GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)
    test('GET /person/:id return message that no such person', async () => {

        const response = await request.get(`/person/${newPerson.id}`);

        expect(response.statusCode).toBe(404)

        expect(response.body).toEqual(`person with id ${newPerson.id} is not exist`)
    })
    server.close()
})