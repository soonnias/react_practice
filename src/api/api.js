import axios from 'axios'
import { validateUserData } from '../validation/validation'

const BASE_URL = 'https://dummyjson.com/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials)

    const { accessToken } = response.data

    /*if (accessToken) {
      localStorage.setItem('token', accessToken)
    }*/

    return accessToken
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/users')
    return response.data.users
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching users')
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`)
    const { firstName, lastName, email, phone, address, image, age, id } =
      response.data

    // Форматуємо адресу без координат
    const formattedAddress = [
      address.address,
      address.city,
      address.state,
      address.stateCode,
      address.postalCode,
      address.country,
    ]
      .filter(Boolean)
      .join(', ')

    return {
      id,
      firstName,
      lastName,
      email,
      phone,
      address: formattedAddress,
      image,
      age,
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching user')
  }
}

export const createUser = async (firstName, lastName, email, phone, age) => {
  try {
    validateUserData(firstName, lastName, email, phone, age) // Перевіряємо всі поля

    const userData = { firstName, lastName, email, phone, age }
    const response = await axiosInstance.post('/users/add', userData)

    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating user')
  }
}

export const updateUser = async (
  userId,
  firstName,
  lastName,
  email,
  phone,
  age
) => {
  try {
    validateUserData(firstName, lastName, email, phone, age)

    const { data: currentUser } = await axiosInstance.get(`/users/${userId}`)

    const updatedUser = {
      ...currentUser,
      firstName,
      lastName,
      email,
      phone,
      age,
    }

    const response = await axiosInstance.put(`/users/${userId}`, updatedUser)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating user')
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error.message)
    return null
  }
}
