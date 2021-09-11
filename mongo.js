require('dotenv').config()
const mongoose = require('mongoose')

const url = `process.env.MONGODB_URI`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)


    // person.save().then(result => {
    //     console.log(`person ${name} with number ${number} added`)
    //     mongoose.connection.close()
    // })

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})

