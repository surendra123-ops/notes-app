import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    console.log('=== AUTH CALLBACK DEBUG ===')
    console.log('Current URL:', window.location.href)
    console.log('Hash:', window.location.hash)
    console.log('Search params:', searchParams.toString())
    
    const handleCallback = async () => {
      // Try multiple ways to get the token
      const tokenFromParams = searchParams.get('token')
      const tokenFromHash = new URLSearchParams(window.location.hash.substring(1)).get('token')
      const tokenFromURL = new URLSearchParams(window.location.search).get('token')
      
      console.log('Token from searchParams:', tokenFromParams)
      console.log('Token from hash:', tokenFromHash)
      console.log('Token from URL:', tokenFromURL)
      
      const token = tokenFromParams || tokenFromHash || tokenFromURL
      console.log('Final token:', token)
      
      if (token) {
        try {
          console.log('Processing token...')
          
          // Store the token
          localStorage.setItem('token', token)
          console.log('Token stored in localStorage')
          
          // Set the authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          console.log('Authorization header set')
          
          // Fetch user data to verify the token works
          console.log('Fetching user data from /api/auth/me...')
          const response = await axios.get('/api/auth/me')
          console.log('User data received:', response.data)
          
          if (response.data.user) {
            // Update the AuthContext with the user data
            setUser(response.data.user)
            console.log('User set in context:', response.data.user)
            
            toast.success('Login successful!')
            console.log('Redirecting to dashboard...')
            // Navigate to dashboard
            navigate('/dashboard')
          } else {
            console.error('No user data in response')
            throw new Error('No user data received')
          }
        } catch (error) {
          console.error('Auth callback error:', error)
          console.error('Error response:', error.response?.data)
          console.error('Error status:', error.response?.status)
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          toast.error('Authentication failed')
          navigate('/login')
        }
      } else {
        console.log('No token found in any location')
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
        <p className="text-sm text-gray-500 mt-2">Check console for debug info</p>
        <p className="text-xs text-gray-400 mt-1">URL: {window.location.href}</p>
      </div>
    </div>
  )
}

export default AuthCallback
