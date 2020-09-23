import React, { useState } from 'react'
import Persons from './components/Persons'
import Personsform from './components/Personsform'
import Filter from './components/Filter'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  //2.7, can't just blindly set person anymore, if statements?
  const handleSubmit = (event) => {
    const person = { name: newName, number: newPhone}

    console.log(newName)
    console.log(newPhone)

    event.preventDefault()
    persons.some((persons) => persons.name === person.name)
    ? alert(`${person.name} is already added to phonebook`)
    : setPersons(persons.concat(person))


    setNewName('')
    setNewPhone('')
    setFilter('')
  }


  // if persons.map(person => person.name).includes(newName) {blablabla}
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const results = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  // filter right below phonebook
  return (
    <div>
      <h2>Phonebook</h2>

  <Filter>filter={filter} handleChange={handleNewFilterChange}</Filter>

      <h2>add a new</h2>

      <Personsform addPers={handleSubmit} newName={newName} handleNewName={handleInputChange}
                    newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <h2>Numbers</h2>
      <Persons persons={results}/>
    </div>
  )
}

export default App