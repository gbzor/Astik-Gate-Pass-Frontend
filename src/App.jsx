import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register key="student" role="student" />} />
        <Route path="/register/faculty" element={<Register key="faculty" role="faculty" />} />
        <Route path="/status" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
