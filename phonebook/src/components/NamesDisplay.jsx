  const NamesDisplay = ({namesToDisplay}) => {
    if (namesToDisplay.length === 0) {
        return (
            <div>No contacts matching search query</div>
        )
    } else {
        return (
            <ul>
            {namesToDisplay.map((person, index) => <li key={index}>{person.name}: {person.number}</li>)}
            </ul>
        )
    }
  }

export default NamesDisplay