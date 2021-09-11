require('dotenv').config
const express = require('express')
var morgan = require(`morgan`)
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(`tiny`))
app.use(cors())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    console.log(request.body)
    const body = request.body
    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: `content missing`
        })
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: `Name already exists`
    //     })
    // }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})