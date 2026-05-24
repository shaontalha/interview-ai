import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth"; // adjust path as needed
import "../style/navbar.scss";  // adjust path as needed

const Navbar = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    await handleLogout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar__brand" onClick={() => navigate("/")}>
        <span className="navbar__logo">✦</span>
        <span className="navbar__name">Interview AI</span>
      </div>

      <div className="navbar__right">
        {user && (
          <>
            <span className="navbar__user">👤 {user.username || user.email}</span>
            <button className="navbar__logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar