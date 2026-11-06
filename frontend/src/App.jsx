import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Overview from './pages/admin/Overview.jsx'
import WorkOrders from './pages/admin/WorkOrders.jsx'
import WorkOrderDetail from './pages/admin/WorkOrderDetail.jsx'
import Properties from './pages/admin/Properties.jsx'
import Contractors from './pages/admin/Contractors.jsx'
import Reports from './pages/admin/Reports.jsx'
import ReportIssue from './pages/user/ReportIssue.jsx'
import MyTickets from './pages/user/MyTickets.jsx'
import Account from './pages/user/Account.jsx'

function Home() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin' : '/app'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="work-orders" element={<WorkOrders />} />
          <Route path="work-orders/:id" element={<WorkOrderDetail />} />
          <Route path="properties" element={<Properties />} />
          <Route path="contractors" element={<Contractors />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="tenant" />}>
        <Route path="/app" element={<UserLayout />}>
          <Route index element={<ReportIssue />} />
          <Route path="tickets" element={<MyTickets />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
