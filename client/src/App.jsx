import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminProtected from './components/AdminProtected.jsx'
import { AdminProvider } from './context/AdminContext.jsx'

function App() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
    </AdminProvider>
  )
}

export default App
