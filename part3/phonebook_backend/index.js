const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
//app.use(morgan('tiny'))

const {PORT} = process.env.PORT || 3001


morgan.token('info', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :response-time ms :info'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let persons = [
 { id: 1, name: "Arto Hellas", number: "040-123456" },
 { id: 2, name: "Ada Lovelace", number: "39-44-54323523"},
 { id: 3, name: "Dan Abramov", number: "12-43-234345"},
 { id: 4, name: "Mary Poppendick", number: "39-23-6423122"}
]


const generateId = () => {
	const maxId = persons.length > 0 
     	? Math.max(...persons.map(p => p.id))
 	: 0
     return maxId + 1
}


app.get('/api/persons', (request, response) => {
   response.json(persons)

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const perz = persons.find(p => p.id === id)

    if (perz) {
        response.json(perz)
    } else {
        response.status(404).end()
    }

})


app.get('/info', (request, response) => {
   const info = `<p>Phonebook has info for ${persons.length} people </p>` 
   
   const date = `<p>${new Date()}</p>`
   response.write(info)
   response.write(date)

   response.end()
})


app.post('/api/persons', (request, response) => {
    const perz = request.body
    
    // if either is null
    if (perz.name === undefined || perz.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' })
     }
    // if name already exists
    // both http response (status) 400
    else if (persons.map(p => p.name).includes(perz.name)) {
        return response.status(400).json( { error: 'name must be unique' })
    }

    const realPers = {
       name: perz.name, 
       number: perz.number,
       //id: Math.floor(Math.random() * 10000)
       id: generateId()
    }

   persons = persons.concat(realPers)

   response.json(realPers)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
   // delete persons.id
   persons = persons.filter(p => p.id !== id)
   response.status(204).end()
})



//heroku crashes when GET '/'??
app.get('/', (req, res) => {
	res.write('<h1>welcome</h1>')
	res.write('<p>you have been selected. figure out the next steps, if you are worthy')
	res.end()
})
