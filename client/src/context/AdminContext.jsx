import { createContext, useEffect, useState } from 'react'

export const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token)
    } else {
      localStorage.removeItem('admin_token')
    }
  }, [token])

  return (
    <AdminContext.Provider value={{ token, setToken }}>
      {children}
    </AdminContext.Provider>
  )
}
