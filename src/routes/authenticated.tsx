import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

function AuthenticatedLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem('token')

    if (!token) {
      navigate({ to: '/login' })
    }
  }, [navigate])

  return <Outlet />
}

export const Route = createFileRoute('/authenticated')({
  beforeLoad: () => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem('token')

    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AuthenticatedLayout,
})