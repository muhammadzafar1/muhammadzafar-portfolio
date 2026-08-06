import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx'

export default function AdminProtected({ children }) {
  const { token } = useContext(AdminContext)
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
