import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    if (!localStorage.getItem('token')) return
    api('/auth/v1/me')
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const data = await api('/auth/v1/login', { method: 'POST', body: { email, password } })
    localStorage.setItem('token', data.access_token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  if (loading) return null
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)