import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const SuperAdminRoutes = ({ userRole }) => {
  return (
    <div>
      {userRole === "SUPER_ADMIN" ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default SuperAdminRoutes