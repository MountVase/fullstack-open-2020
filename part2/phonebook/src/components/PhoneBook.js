import React from 'react'
import Persons from './Persons'


const PhoneBook = ({persons, filter}) => {

const list = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

return (
    <ul>
        {list.map(person => <Persons name={person.name} number={person.number}/>)}
    </ul>
)
}

export default PhoneBook