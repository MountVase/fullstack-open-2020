import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Personsform from './components/Personsform'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')


  const [filtered, setFiltered] = useState(persons) // filter becomes array of persons 

  const [search, setSearch] = useState('')          //maybe another state for the fucking searchfield?



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
    setFiltered('')
  }


  // if persons.map(person => person.name).includes(newName) {blablabla}
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const filterPers = (newList, searchQ) => setFiltered(newList.filter(
    person => 
    person.name.toLowerCase().includes(searchQ.toLowerCase())))


  const handleSearch = (event) => {
    console.log(event.target.value)
    
    filterPers(persons, event.target.value)
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      filterPers(response.data, search) // filter persons according to data, and search query

    return () => console.log("this will be logged on unmount")
    })}, [])
  

  

  return (
    <div>
      <h2>Phonebook</h2>

    <Filter>filter={setSearch} handleChange={handleSearch}</Filter>

      <h2>add a new</h2>

      <Personsform addPers={handleSubmit} newName={newName} handleNewName={handleInputChange}
                    newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <h2>Numbers</h2>
      <Persons persons={filtered}/>
    </div>
  )
}

export default App