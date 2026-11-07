import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import StudentLayout from './components/StudentLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import { AuthProvider } from './context/Authcontext'
import ProtectedRoute from './components/Protectedroute'
import AdminLogin from './pages/admin/login/AdminLogin'
import Admindashboard from './pages/admin/dashboard/Admindashboard'
import Adminapplicants from './pages/admin/applicants/Adminapplicants'
import Adminapplicantdetails from './pages/admin/applicants/Adminapplicantdetails'
import Adminrecords from './pages/admin/records/Adminrecords'
import Adminrecorddetails from './pages/admin/records/Adminrecorddetails'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* student side */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register key="student" role="student" />} />
          <Route path="/register/faculty" element={<Register key="faculty" role="faculty" />} />
          <Route path="/status" element={<Home />} />
          <Route element={<StudentLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* admin side */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Admindashboard />} />
            <Route path="/admin/applicants" element={<Adminapplicants />} />
            <Route path="/admin/applicants/:id" element={<Adminapplicantdetails />} />
            <Route path="/admin/records" element={<Adminrecords />} />
            <Route path="/admin/records/:id" element={<Adminrecorddetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}