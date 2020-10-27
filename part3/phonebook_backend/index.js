require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')


const app = express()

//cors might be unnecessary
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//app.use(morgan('tiny'))



morgan.token('info', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :response-time ms :info'))

/*
const generateId = () => {
	const maxId = persons.length > 0 
     	? Math.max(...persons.map(p => p.id))
 	: 0
     return maxId + 1
}
*/


app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})


app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
		if (person) response.json(person.toJSON())
		else response.status(404).end()
	})
	//doesn't work without error catching implementation, which comes later
	//.catch(error => next(error))
})

app.get('/info', (request, response) => {
   Person.countDocuments({}).then(count => {

   const info = `<p>Phonebook has info for ${count} people </p>` 
   
   const date = `<p>${new Date()}</p>`
   response.write(info)
   response.write(date)

   response.end()

   })   
})


app.post('/api/persons', (request, response) => {
    const perz = request.body
    
    // if either is null
    if (perz.name === undefined || perz.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' })
     }
    // if name already exists
    // both http response (status) 400

 
    const pers = new Person({
    	name: perz.name,
    	number: perz.number
    })

    pers.save().then(savedNote => {
    	response.json(savedNote)
    })

})

/*
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
   // delete persons.id
   persons = persons.filter(p => p.id !== id)
   response.status(204).end()
})

*/

//heroku crashes when GET '/'??
app.get('/', (req, res) => {
	res.write('<h1>welcome</h1>')
	res.write('<p>you have been selected. figure out the next steps, if you are worthy')
	res.end()
})


const PORT = process.env.PORT //|| 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})