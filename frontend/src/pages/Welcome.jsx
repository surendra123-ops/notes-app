import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Mail, CheckCircle } from 'lucide-react'

const Welcome = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Function to generate avatar from username
  const generateAvatar = (name) => {
    if (!name) return '?'
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
    return initials.slice(0, 2)
  }

  // Function to get avatar background color based on username
  const getAvatarColor = (name) => {
    if (!name) return 'bg-gray-500'
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Note Taking App!
          </h1>
          <p className="text-xl text-gray-600">
            Your personal note-taking companion
          </p>
        </div>

        {/* User Information Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto rounded-full ${getAvatarColor(user?.name)} flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4`}>
              {generateAvatar(user?.name)}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Hello, {user?.name || 'User'}!
            </h2>
            <p className="text-gray-600">
              Welcome back to your personal note-taking space
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* User Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-600" />
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{user?.name || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-green-600">Email Verification</p>
                    <p className="font-medium text-green-800">Verified</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <svg className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-600">Account Security</p>
                    <p className="font-medium text-blue-800">Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-lg px-8 py-3 mr-4 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="btn-secondary text-lg px-8 py-3 flex items-center mx-auto mt-4"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome