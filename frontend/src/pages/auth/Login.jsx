import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from './AuthShell.jsx'
import { Field, Input } from '../../components/ui/Field.jsx'
import Button from '../../components/ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email || !password) return setError('Enter your email and password to sign in.')
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(user.role === 'admin' ? '/admin' : '/app', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to your PropDesk workspace."
      footer={<>New to PropDesk? <Link to="/register" className="font-medium text-indigo-600">Request access</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jordan.m@example.com" />
        </Field>
        <Field label="Password">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </Field>
        {error && <p className="text-sm text-rose-600" role="alert">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthShell>
  )
}