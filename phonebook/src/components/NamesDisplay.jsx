const Name = ({id, name, number, handleClick}) => <li key={id}>
            <span className="contact-name">{name}: </span> 
            <span className="contact-number">{number} </span> 
            <button onClick={() => handleClick(id)}>Delete Contact</button>
        </li>

const NamesDisplay = ({namesToDisplay, handleClick}) => {
    if (namesToDisplay.length === 0) {
        return (
            <div>No contacts matching search query</div>
        )
    } else {
        return (
            <ul>
            {[...namesToDisplay]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((person, id) => <Name key={id} handleClick={handleClick} 
                name={person.name} number={person.number} id={person.id}/>)}
            </ul>
        )
    }
}

export default NamesDisplay