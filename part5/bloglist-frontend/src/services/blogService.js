import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const auth = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, auth)

  console.log('blogService response.data: ', response.data)
  return response.data
}

const update = async (id, newBlog) => {
  const auth = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, auth)
  return response.data
}

const remove = async id => {
  const auth = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, auth)
  return response.data
}



export default { getAll, create, setToken, update, remove}