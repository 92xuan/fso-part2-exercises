import { useState } from 'react'
import NamesDisplay from './components/NamesDisplay'
import SearchBar from './components/SearchBar'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 6043101010 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPersons = [...persons]
    const personExists = newPersons.some(user => user.name === newName)

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
    newPersons.push({name: newName, number:newNumber})
    }
  
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearchName = (event) => setSearchName(event.target.value)

  const namesToDisplay = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  // console.table({numbersToShow})

  return (
    <div>
      <h2>Phonebook</h2>
      <NamesDisplay namesToDisplay={namesToDisplay} />

      <h2>Add New Contact</h2>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} addNewPerson={addNewPerson}/>

      <h2>Search</h2>
      <SearchBar searchName={searchName} handleSearchName={handleSearchName} />
    </div>
  )
}

export default App