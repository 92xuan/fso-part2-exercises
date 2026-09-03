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

const updateNumber = (name, newNumber) => {
    const request = axios.get(`${baseurl}?name=${name}`)
    return request.then(request => {
        const id = request.data[0].id
        axios.put(`${baseurl}/${id}`, { name: name, number:newNumber })
   })
}

const deleteContact = (contact) => {
    const request = axios.get(`${baseurl}?name=${contact}`)
    return request.then(request => {
        const id = request.data[0].id
        axios.delete(`${baseurl}/${id}`)
    })
}


export default { getAll, createNew, deleteContact, updateNumber }