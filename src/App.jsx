import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import StudentLayout from './components/student/StudentLayout.jsx'
import Dashboard from './pages/student/Dashboard.jsx'
import VehicleRegistration from './pages/student/VehicleRegistration.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLogin from './pages/admin/login/AdminLogin'
import AdminDashboard from './pages/admin/dashboard/AdminDashboard'
import AdminApplicants from './pages/admin/applicants/AdminApplicants'
import AdminApplicantDetails from './pages/admin/applicants/AdminApplicantDetails'
import AdminRecords from './pages/admin/records/AdminRecords'
import AdminRecordDetails from './pages/admin/records/AdminRecordDetails'

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
            <Route path="/vehicle-registration" element={<VehicleRegistration />} />
          </Route>

          {/* admin side */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/applicants" element={<AdminApplicants />} />
            <Route path="/admin/applicants/:id" element={<AdminApplicantDetails />} />
            <Route path="/admin/records" element={<AdminRecords />} />
            <Route path="/admin/records/:id" element={<AdminRecordDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}