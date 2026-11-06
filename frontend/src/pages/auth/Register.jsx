// src/pages/auth/Register.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import AuthShell from './AuthShell.jsx'
import { Field, Input, Select } from '../../components/ui/Field.jsx'
import Button from '../../components/ui/Button.jsx'
import { api } from '../../lib/api.js'

export default function Register() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    property: 'Apex Towers',
    unit: '',
    password: '',
  })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api('/auth/v1/create-register-request', {
        method: 'POST',
        body: {
          // keys must match your RegisterRequest model exactly
          name: form.name,
          email: form.email,
          property: form.property,
          unit: form.unit,
          password: form.password,
        },
      })
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (sent)
    return (
      <AuthShell
        title="Request sent."
        subtitle="Your property team will review it."
        footer={<Link to="/login" className="font-medium text-indigo-600">Back to sign in</Link>}
      >
        <div className="flex gap-3 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 size={18} className="shrink-0" />
          We’ll email {form.email} once your unit access is approved.
        </div>
      </AuthShell>
    )

  return (
    <AuthShell
      title="Request access"
      subtitle="Residents are approved by their property team."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600">Sign in</Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name">
          <Input required value={form.name} onChange={set('name')} placeholder="Morgan Lee" />
        </Field>
        <Field label="Email">
          <Input required type="email" value={form.email} onChange={set('email')} placeholder="morgan.l@example.com" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Property">
            <Select
              value={form.property}
              onChange={set('property')}
              options={['Apex Towers', 'Parkside Residences', 'The Grove', 'Harbor House']}
            />
          </Field>
          <Field label="Unit">
            <Input required value={form.unit} onChange={set('unit')} placeholder="4B" />
          </Field>
        </div>
        <Field label="Password">
          <Input required minLength={8} type="password" value={form.password} onChange={set('password')} placeholder="At least 8 characters" />
        </Field>

        {error && <p className="text-sm text-rose-600" role="alert">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending…' : 'Send request'}
        </Button>
      </form>
    </AuthShell>
  )
}