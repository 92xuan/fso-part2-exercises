import axios from 'axios'
const baseurl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const createNew = (newPerson) => {
    const request = axios.post(baseurl, newPerson)
    return request.then(response => response.data)
}

const updateNumber = async (contact, newNumber) => {
    const id = contact.id
    const name = contact.name
    const request = axios.put(`${baseurl}/${id}`, { name: name, number:newNumber })
    return request.then(response => response.data)
}

const deleteContact = (contact) => {
    const request = axios.delete(`${baseurl}/${contact.id}`)
    return request.then(response => response.data)
}

export default { getAll, createNew, deleteContact, updateNumber }