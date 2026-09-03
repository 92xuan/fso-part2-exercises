import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const createNew = (newPerson) => {
    const request = axios.post(baseurl, newPerson)
    return request.then(response => response.data)
}

const updateNumber = async (name, newNumber) => {
    const id = await axios.get(`${baseurl}?name=${name}`)
                    .then(response => response.data[0].id)
    const request = axios.put(`${baseurl}/${id}`, { name: name, number:newNumber })
    return request.then(response => response.data)
}

const deleteContact = (contact) => {
    const request = axios.get(`${baseurl}?name=${contact}`)
    return request.then(response => {
        const id = response.data[0].id
        axios.delete(`${baseurl}/${id}`)
    })
}


export default { getAll, createNew, deleteContact, updateNumber }