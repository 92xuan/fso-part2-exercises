import { useState, useEffect } from 'react'
import NamesDisplay from './components/NamesDisplay'
import SearchBar from './components/SearchBar'
import PersonForm from './components/PersonForm'
import PhonebookService from './services/Phonebook'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    PhonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPersons = [...persons]
    const personExists = newPersons.some(user => user.name === newName)

    if (personExists) {
      const updateContact = window.confirm(`${newName} is already added to the database. Replace existing number with a new one?`)
      if (updateContact) {
        PhonebookService.updateNumber(newName, newNumber)
      }
    } else {
      const newContact = {
        name: newName, 
        number: newNumber, 
        id: ++newPersons.length
      }
      PhonebookService
        .createNew(newContact)
        .then(response => {
          newPersons.push(response)
          setPersons(newPersons)
          console.log(`new: ${newPersons}`)
          console.log(`persons: ${persons}`)
        })
    }
  
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    event.preventDefault()

    const nameToBeDeleted = event.currentTarget.parentElement.querySelector('.contact-name').textContent

    if (window.confirm(`Delete ${nameToBeDeleted} from the phonebook?`)) {
      const newPersons = [...persons].filter(person => person.name !== nameToBeDeleted)
      setPersons(newPersons)
      PhonebookService
        .deleteContact(nameToBeDeleted)
    }
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearchName = (event) => setSearchName(event.target.value)

  const namesToDisplay = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <NamesDisplay namesToDisplay={namesToDisplay} handleClick={deletePerson}/>

      <h2>Add New Contact</h2>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} addNewPerson={addNewPerson}/>

      <h2>Search</h2>
      <SearchBar searchName={searchName} handleSearchName={handleSearchName} />
    </div>
  )
}

export default App