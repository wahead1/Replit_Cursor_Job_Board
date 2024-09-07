import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          is_admin: true // Set this to true if you want all new users to be admins
        }
      }
    })
    if (error) {
      setError(error.message)
    } else {
      // Check if user needs to confirm their email
      if (data?.user?.identities?.length === 0) {
        setError('Please check your email to confirm your account')
      } else {
        router.push('/admin')
      }
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}