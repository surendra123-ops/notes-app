import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { 
  Plus, 
  Search, 
  LogOut, 
  Edit3, 
  Trash2, 
  Pin, 
  PinOff,
  User,
  Mail,
  X,
  Menu,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  MoreVertical,
  Calendar,
  Tag,
  Eye,
  EyeOff,
  Bell,
  Settings,
  Home
} from 'lucide-react'

const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    color: '#ffffff'
  })
  const [viewMode, setViewMode] = useState('grid')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes')
      setNotes(response.data.notes)
    } catch (error) {
      toast.error('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNote = async (e) => {
    e.preventDefault()
    try {
      const noteData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      const response = await axios.post('/api/notes', noteData)
      setNotes([response.data.note, ...notes])
      setShowCreateModal(false)
      setFormData({ title: '', content: '', tags: '', color: '#ffffff' })
      toast.success('Note created successfully!')
    } catch (error) {
      toast.error('Failed to create note')
    }
  }

  const handleEditNote = async (e) => {
    e.preventDefault()
    try {
      const noteData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      const response = await axios.put(`/api/notes/${editingNote._id}`, noteData)
      setNotes(notes.map(note => 
        note._id === editingNote._id ? response.data.note : note
      ))
      setShowEditModal(false)
      setEditingNote(null)
      setFormData({ title: '', content: '', tags: '', color: '#ffffff' })
      toast.success('Note updated successfully!')
    } catch (error) {
      toast.error('Failed to update note')
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`/api/notes/${noteId}`)
        setNotes(notes.filter(note => note._id !== noteId))
        toast.success('Note deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete note')
      }
    }
  }

  const handleTogglePin = async (note) => {
    try {
      const response = await axios.put(`/api/notes/${note._id}`, {
        isPinned: !note.isPinned
      })
      setNotes(notes.map(n => 
        n._id === note._id ? response.data.note : n
      ))
      toast.success(note.isPinned ? 'Note unpinned' : 'Note pinned')
    } catch (error) {
      toast.error('Failed to update note')
    }
  }

  const openEditModal = (note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
      color: note.color
    })
    setShowEditModal(true)
  }

  // Get all unique tags
  const allTags = [...new Set(notes.flatMap(note => note.tags))]

  // Filter and sort notes
  let filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => note.tags.includes(tag))
    
    const matchesPinned = !showPinnedOnly || note.isPinned
    
    return matchesSearch && matchesTags && matchesPinned
  })

  // Sort notes
  filteredNotes.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const pinnedNotes = filteredNotes.filter(note => note.isPinned)
  const regularNotes = filteredNotes.filter(note => !note.isPinned)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your notes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile-First Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo and Title - Mobile Optimized */}
            <div className="flex items-center">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg">
                <svg className="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Notes</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Organize your thoughts</p>
              </div>
            </div>
            
            {/* Add Home Button */}
            <button
              onClick={() => navigate('/')}
              className="hidden md:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full ${getAvatarColor(user?.name)} flex items-center justify-center text-white text-sm font-medium shadow-md`}>
                  {generateAvatar(user?.name)}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full ${getAvatarColor(user?.name)} flex items-center justify-center text-white text-lg font-medium`}>
                  {generateAvatar(user?.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content - Responsive Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Welcome Section - Mobile Optimized */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-primary-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl ${getAvatarColor(user?.name)} flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold shadow-lg`}>
              {generateAvatar(user?.name)}
            </div>
            <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name?.split(' ')[0] || 'User'}!
              </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  You have {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto btn-primary flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>New Note</span>
            </button>
          </div>
        </div>

        {/* Search and Controls - Mobile First */}
        <div className="space-y-4 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={isMobile ? "Search notes..." : "Search notes by title, content, or tags..."}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Controls Row - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
            {/* View and Sort Controls */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm flex-1 sm:flex-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center ${
                  showFilters ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              <button
                onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center ${
                  showPinnedOnly ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Pin className="h-4 w-4" />
                <span>Pinned</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
          <button
                    onClick={() => setSelectedTags([])}
                    className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          >
                    Clear All
          </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notes Grid/List - Responsive */}
        <div className="space-y-6 sm:space-y-8">
          {/* Pinned Notes */}
          {pinnedNotes.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <Pin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-600" />
                Pinned Notes ({pinnedNotes.length})
              </h2>
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" 
                : "space-y-3 sm:space-y-4"
              }>
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={openEditModal}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                    viewMode={viewMode}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Notes */}
          {regularNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && (
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  All Notes ({regularNotes.length})
                </h2>
              )}
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" 
                : "space-y-3 sm:space-y-4"
              }>
                {regularNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={openEditModal}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                    viewMode={viewMode}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                {searchTerm || selectedTags.length > 0 || showPinnedOnly ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
                {searchTerm || selectedTags.length > 0 || showPinnedOnly 
                  ? 'Try adjusting your search terms or filters' 
                  : 'Create your first note to get started organizing your thoughts'
                }
              </p>
              {!searchTerm && selectedTags.length === 0 && !showPinnedOnly && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn-primary shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Create Your First Note
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modals */}
      {showCreateModal && (
        <NoteModal
          title="Create New Note"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateNote}
          onClose={() => {
            setShowCreateModal(false)
            setFormData({ title: '', content: '', tags: '', color: '#ffffff' })
          }}
          isMobile={isMobile}
        />
      )}

      {showEditModal && (
        <NoteModal
          title="Edit Note"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleEditNote}
          onClose={() => {
            setShowEditModal(false)
            setEditingNote(null)
            setFormData({ title: '', content: '', tags: '', color: '#ffffff' })
          }}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}

// Enhanced Note Card Component - Mobile Optimized
const NoteCard = ({ note, onEdit, onDelete, onTogglePin, viewMode, isMobile }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
        style={{ borderLeftColor: note.color, borderLeftWidth: '4px' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                {note.title}
              </h3>
              {note.isPinned && (
                <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {note.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(note.createdAt)}</span>
                </span>
                {note.tags.length > 0 && (
                  <span className="flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{note.tags.length} tags</span>
                  </span>
                )}
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onTogglePin(note)
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title={note.isPinned ? 'Unpin' : 'Pin'}
                >
                  {note.isPinned ? (
                    <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                  ) : (
                    <PinOff className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(note)
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(note._id)
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group h-full flex flex-col"
      style={{ backgroundColor: note.color }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2 flex-1">
          {note.title}
        </h3>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onTogglePin(note)
            }}
            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            {note.isPinned ? (
              <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
            ) : (
              <PinOff className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(note)
            }}
            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(note._id)
            }}
            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm line-clamp-4 mb-4 flex-1">
        {note.content}
      </p>
      
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/70 text-gray-600 text-xs rounded-full backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > (isMobile ? 2 : 3) && (
            <span className="px-2 py-1 bg-white/70 text-gray-500 text-xs rounded-full backdrop-blur-sm">
              +{note.tags.length - (isMobile ? 2 : 3)} more
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
        <span>{formatDate(note.createdAt)}</span>
        <span className="hidden sm:inline">{formatTime(note.createdAt)}</span>
      </div>
    </div>
  )
}

// Enhanced Modal Component - Mobile Optimized
const NoteModal = ({ title, formData, setFormData, onSubmit, onClose, isMobile }) => {
  const colors = [
    '#ffffff', '#fef3c7', '#d1fae5', '#dbeafe', 
    '#fce7f3', '#e0e7ff', '#fef2f2', '#f0fdf4',
    '#f3e8ff', '#ecfdf5', '#fefce8', '#f0f9ff'
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] overflow-hidden ${
        isMobile ? 'max-w-sm' : 'max-w-2xl'
      }`}>
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className={`p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${
          isMobile ? 'max-h-[calc(95vh-120px)]' : 'max-h-[calc(90vh-120px)]'
        }`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
              placeholder="Enter note title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              required
              rows={isMobile ? 4 : 6}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none text-base"
              placeholder="Enter note content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
              placeholder="work, personal, important"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Background Color
            </label>
            <div className={`grid gap-2 sm:gap-3 ${
              isMobile ? 'grid-cols-4' : 'grid-cols-6'
            }`}>
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    formData.color === color ? 'border-gray-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {title.includes('Create') ? 'Create Note' : 'Update Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboard