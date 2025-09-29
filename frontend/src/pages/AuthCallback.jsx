import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('AuthCallback component mounted')
    console.log('Search params:', searchParams.toString())
    
    const handleCallback = async () => {
      const token = searchParams.get('token')
      console.log('Token received:', token ? 'YES' : 'NO')
      
      if (token) {
        try {
          console.log('Processing token...')
          
          // Store the token
          localStorage.setItem('token', token)
          
          // Set the authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Fetch user data to verify the token works
          const response = await axios.get('/api/auth/me')
          console.log('User data received:', response.data.user)
          
          if (response.data.user) {
            toast.success('Login successful!')
            console.log('Redirecting to dashboard...')
            // Reload the page to let AuthContext pick up the token
            window.location.href = '/dashboard'
          } else {
            throw new Error('No user data received')
          }
        } catch (error) {
          console.error('Auth callback error:', error)
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          toast.error('Authentication failed')
          navigate('/login')
        }
      } else {
        console.log('No token found')
        toast.error('No authentication token received')
        navigate('/login')
      }
    }

    handleCallback()
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
        <p className="text-sm text-gray-500 mt-2">Check browser console for debug info</p>
      </div>
    </div>
  )
}

export default AuthCallback
