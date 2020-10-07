import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null })

  // now fetching data via personservice and setting persons state

  useEffect(() => {
    personService.getAll().then(data => {setPersons(data)})
      
  }, [])


  const showNotification = (message, type) => {
    setNotification({ message, type })
    
    // after 5000, set message to null again
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const removePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id))
  }
  

  const addPerson = (event) => {
    event.preventDefault()

    const duplicate = persons.find((person) => person.name === newName)

    if (duplicate) {
      const choice = window.confirm(`${duplicate.name} is already added to phonebook, replace the old number with a new one?`)
      
      if (choice) {
        const newPerson = { ...duplicate, number: newNumber }
        personService
          .update(newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            showNotification(`Updated ${updatedPerson.name}`, 'success')
          })
          .catch(err => {
            removePerson(duplicate.id)
            showNotification(`Information of ${duplicate.name} has already been removed from server`, 'error')
          })
      }

    } else {
      const pers = {
        name: newName,
        number: newNumber
      }
      personService
        .create(pers)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          showNotification(`Added ${newPerson.name}`, 'success')
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNewNumber = event => setNewNumber(event.target.value)

  const handleNewFilter = event => setFilter(event.target.value)

  const handleNewName = event => setNewName(event.target.value)

  const notificationType = (notification.type === 'success') ? 'success' : 'error'

  const deletePerson = person => {
    const { id, name } = person
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .remove(id)
      .then(() => removePerson(id))

      .catch(err => {
        removePerson(id)
        showNotification(`Information of ${person.name} has already been removed from server`, 'error')
      })
    }
  }



  const personsResult = filter.length 
                        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 
                        : persons


  return (
    <div>

        <h2>Phonebook</h2>
        <Notification message={notification.message} styleClass={notificationType} />
        <Filter filter={filter} handleFilter={handleNewFilter} />
        <h2>add a new</h2>
      
        <PersonForm name={newName} number={newNumber} onNameChange={handleNewName} onNumberChange={handleNewNumber} onSubmit={addPerson}/>
        <h2>Numbers</h2>
      
        <Persons persons={personsResult}deletePerson={deletePerson}/>
    
    
    </div>
  )
}

export default App