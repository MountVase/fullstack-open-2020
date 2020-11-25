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
    headers: { Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, auth)

  console.log('blogService response.data: ', response.data)
  return response.data
}


export default { getAll, create, setToken}