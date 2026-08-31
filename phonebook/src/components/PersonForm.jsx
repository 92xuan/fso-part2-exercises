const PersonForm = ({newName, handleNewName, newNumber, handleNewNumber, addNewPerson}) => {
    return (
        <form onSubmit={addNewPerson}>
            <div>
                Name: <input
                value={newName} 
                onChange={handleNewName}/>
            </div>
            <div>
                Phone Number: <input
                value={newNumber} 
                onChange={handleNewNumber}/>
            </div>
                <div>
                <button type="submit">Add Contact</button>
            </div>
        </form>
    )
}

export default PersonForm