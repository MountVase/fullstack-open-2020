import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])


  useEffect(() => {
    axios.get(baseUrl).then(response => setResources(response.data))
  }, [])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)

    // setResource can be called if POST is successfull
    setResources([...resources, response.data])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
