import React, { createContext, useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { useRouter } from '../hooks/router'

const AuthContext = createContext<{
  isAuthenticated: boolean,
  user: string | null,
  login: (email: string, password: string) => void,
  loading: boolean,
  logout: () => void
}>({
  isAuthenticated: false,
  user: null,
  loading: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [user, history])

  const login = async (name: string, password: string) => {
    setLoading(true)
    if (name === 'ilya.bashilov' && password === '12345678') {
      setUser(name)
      console.log("Got user", user)
      history.push('/')
    }
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    history.push('/login')
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
