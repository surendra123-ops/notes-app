import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token')
      
      if (token) {
        try {
          // Store the token
          localStorage.setItem('token', token)
          
          // Set the authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Fetch user data
          const response = await axios.get('/api/auth/me')
          setUser(response.data.user)
          
          toast.success('Login successful!')
          navigate('/dashboard')
        } catch (error) {
          console.error('Auth callback error:', error)
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          toast.error('Authentication failed')
          navigate('/login')
        }
      } else {
        toast.error('No authentication token received')
        navigate('/login')
      }
    }

    handleCallback()
  }, [searchParams, navigate, setUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
}

export default AuthCallback
