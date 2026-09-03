const Name = ({index, name, number, handleClick}) => <li 
        key={index}>
        <span className="contact-name">{name}</span>: 
        <span className="contact-number">{number}</span> 
        <button onClick={handleClick}>Delete Contact</button>
        </li>

const NamesDisplay = ({namesToDisplay, handleClick}) => {
    if (namesToDisplay.length === 0) {
        return (
            <div>No contacts matching search query</div>
        )
    } else {
        return (
            <ul>
            {namesToDisplay.map((person, index) => <Name key={index} handleClick={handleClick} 
            name={person.name} number={person.number} />)}
            </ul>
        )
    }
}

export default NamesDisplay