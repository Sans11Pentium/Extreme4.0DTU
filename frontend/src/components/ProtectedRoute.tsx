import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../context/UserContext"
import Layout from "./Layout"

interface ProtectedRouteProps {
  role: "landlord" | "tenant" | "legal"
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useUser()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== role) {
    return <Navigate to={`/${user?.role}/dashboard`} replace />
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default ProtectedRoute

