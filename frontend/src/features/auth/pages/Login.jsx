import React, { useState } from 'react'
import '../auth.form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

export const Login = () => {

  const { loading, handleLogin } = useAuth()
  const navigate=useNavigate()

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
  e.preventDefault()

  const success = await handleLogin({ email, password })

  if (success) {
    navigate('/')
  }
}

if (loading) {
  return (
    <main>
      <h1>Loading...</h1>
    </main>
  )
}

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button className='button primary-button'>
            Login
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to={'/register'}> Register Now</Link>
        </p>
      </div>
    </main>
  )
}