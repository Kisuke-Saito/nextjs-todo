import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
})
