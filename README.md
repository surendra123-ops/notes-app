# Note Taking App

A modern, full-stack web application for creating, managing, and organizing personal notes with secure authentication, beautiful user interface, and comprehensive error handling.

## ✨ Features

### 🔐 Authentication & Security
- **Email & Password Registration** - Simple and secure user registration with real-time validation
- **Google OAuth Integration** - One-click login with Google accounts
- **JWT Authentication** - Secure token-based authentication system
- **Protected Routes** - Route protection for authenticated users only
- **Auto-login** - Seamless login experience with persistent sessions
- **Smart User Flow** - Intelligent redirects between login/register pages
- **Password Strength Indicator** - Visual feedback for password security
- **Comprehensive Error Handling** - Detailed validation and error messages

### 📝 Note Management
- **Create Notes** - Rich text note creation with titles and content
- **Edit & Update** - Real-time note editing and updates
- **Delete Notes** - Secure note deletion with confirmation
- **Pin Notes** - Pin important notes to the top for easy access
- **Color Coding** - Customize note colors for better visual organization
- **Tagging System** - Add and filter notes using custom tags
- **Search Functionality** - Powerful search through notes by title and content
- **Sorting Options** - Sort notes by date, title, or pinned status
- **Pagination** - Efficient handling of large note collections

### 🎨 User Interface & Experience
- **Responsive Design** - Perfect experience across desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **Grid & List Views** - Toggle between different note display modes
- **Real-time Notifications** - Toast notifications for all user actions
- **Loading States** - Smooth loading indicators and skeleton screens
- **Error Handling** - User-friendly error messages with clear instructions
- **Form Validation** - Real-time validation with visual feedback
- **Accessibility** - Proper ARIA labels, keyboard navigation, and screen reader support

### 🔒 Security Features
- **Password Hashing** - Bcrypt with salt rounds for secure password storage
- **JWT Tokens** - Secure token-based authentication with expiration
- **Rate Limiting** - API rate limiting to prevent abuse
- **Input Validation** - Server-side validation for all user inputs
- **CORS Protection** - Configured CORS for secure cross-origin requests
- **Security Headers** - Helmet.js for additional security headers
- **XSS Protection** - Input sanitization and output encoding

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React with modern hooks and concurrent features
- **React Router DOM 6.20.1** - Client-side routing with protected routes
- **Axios 1.6.2** - HTTP client for API communication with interceptors
- **Tailwind CSS 3.3.6** - Utility-first CSS framework for responsive design
- **Lucide React 0.294.0** - Beautiful, customizable icons
- **React Hot Toast 2.4.1** - Elegant toast notifications
- **Vite 7.1.7** - Lightning-fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Fast, unopinionated web framework
- **MongoDB** - Flexible NoSQL database with Atlas support
- **Mongoose 8.0.3** - Elegant MongoDB object modeling with validation
- **JWT (jsonwebtoken 9.0.2)** - JSON Web Token implementation
- **Passport.js 0.7.0** - Authentication middleware with Google OAuth
- **Bcryptjs 2.4.3** - Password hashing library with salt rounds
- **Express Validator 7.0.1** - Server-side validation middleware
- **Helmet 7.1.0** - Security middleware for HTTP headers
- **Express Rate Limit 7.1.5** - Rate limiting middleware

## 📁 Project Structure

```
assignment-2/
├── backend/
│   ├── config/
│   │   └── passport.js          # Google OAuth configuration
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js      # Global error handling middleware
│   ├── models/
│   │   ├── User.js              # User schema with password hashing
│   │   └── Note.js              # Note schema with indexing
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   └── notes.js             # Note CRUD operations
│   ├── package.json
│   └── server.js                # Main server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx   # Route protection component
│   │   │   └── PublicRoute.jsx      # Public route wrapper
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Authentication context provider
│   │   ├── pages/
│   │   │   ├── AuthCallback.jsx     # Google OAuth callback handler
│   │   │   ├── Dashboard.jsx        # Main notes dashboard
│   │   │   ├── Login.jsx            # User login with validation
│   │   │   ├── Register.jsx         # User registration with validation
│   │   │   └── Welcome.jsx          # Welcome landing page
│   │   ├── App.jsx                  # Main application component
│   │   ├── main.jsx                 # Application entry point
│   │   └── index.css                # Global styles and Tailwind
│   ├── package.json
│   └── vite.config.js               # Vite build configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Google OAuth credentials** (for Google login feature)

### Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/notetaking

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application URLs
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment-2
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file

5. **Configure Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
   - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Register a new account or login with Google

## 📚 API Documentation

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Authentication | Request Body |
|--------|----------|-------------|----------------|--------------|
| POST | `/register` | Register new user | None | `{name, email, password}` |
| POST | `/login` | User login | None | `{email, password}` |
| GET | `/google` | Google OAuth login | None | - |
| GET | `/google/callback` | Google OAuth callback | None | - |
| GET | `/me` | Get current user info | Required | - |

### Notes Endpoints (`/api/notes`)

| Method | Endpoint | Description | Authentication | Query Parameters |
|--------|----------|-------------|----------------|------------------|
| GET | `/` | Get all user notes | Required | `page, limit, search, tag` |
| GET | `/:id` | Get single note | Required | - |
| POST | `/` | Create new note | Required | `{title, content, tags, color, isPinned}` |
| PUT | `/:id` | Update note | Required | `{title, content, tags, color, isPinned}` |
| DELETE | `/:id` | Delete note | Required | - |
| GET | `/tags/all` | Get all user tags | Required | - |

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Response
{
  "message": "User created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": ""
  }
}
```

#### Create Note
```bash
POST /api/notes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note",
  "tags": ["work", "important"],
  "color": "#ffffff",
  "isPinned": false
}

# Response
{
  "message": "Note created successfully",
  "note": {
    "_id": "note-id",
    "title": "My First Note",
    "content": "This is the content of my note",
    "tags": ["work", "important"],
    "color": "#ffffff",
    "isPinned": false,
    "author": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🔐 Authentication Flow

### Email/Password Registration
1. User submits registration form with name, email, and password
2. Frontend validates input with real-time feedback
3. Backend validates input and creates user account
4. User account is immediately verified (no OTP required)
5. JWT token is generated and returned
6. User is automatically logged in and redirected to dashboard

### Email/Password Login
1. User submits login form with email and password
2. Frontend validates input with real-time feedback
3. Backend validates credentials and returns JWT token
4. User is logged in and redirected to dashboard
5. If user doesn't exist, smart redirect to register page

### Google OAuth Flow
1. User clicks "Login with Google" button
2. Redirected to Google OAuth consent screen
3. After consent, redirected back with authorization code
4. Backend exchanges code for user profile information
5. User account is created/linked automatically
6. JWT token is issued and user is logged in

## 🎨 UI/UX Features

### Form Validation & Error Handling
- **Real-time Validation** - Immediate feedback as users type
- **Field-specific Errors** - Individual error messages for each field
- **Visual Feedback** - Red borders and icons for invalid fields
- **Password Strength** - Visual indicator for password security
- **Smart Redirects** - Automatic navigation based on error conditions
- **Error Clearing** - Errors disappear when user starts fixing them

### Responsive Design
- **Mobile-first Approach** - Optimized for mobile devices
- **Breakpoint System** - Responsive design across all screen sizes
- **Touch-friendly Controls** - Large buttons and touch targets
- **Collapsible Navigation** - Mobile-optimized navigation menu

### User Experience
- **Loading States** - Smooth loading indicators and skeleton screens
- **Toast Notifications** - Non-intrusive success/error messages
- **Context Preservation** - Email pre-filling between pages
- **Keyboard Navigation** - Full keyboard accessibility support

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: 1200px and above - Full feature set with sidebar navigation
- **Tablet**: 768px - 1199px - Optimized layout with touch-friendly controls
- **Mobile**: 320px - 767px - Mobile-first design with collapsible navigation

### Responsive Features
- **Adaptive Layouts** - Different layouts for different screen sizes
- **Touch Gestures** - Swipe and touch interactions on mobile
- **Optimized Typography** - Readable text across all devices
- **Efficient Navigation** - Easy navigation on small screens

## 🚀 Deployment

### Backend Deployment
- Deploy to platforms like **Heroku**, **Railway**, **DigitalOcean**, or **AWS**
- Set up **MongoDB Atlas** for production database
- Configure environment variables on your hosting platform
- Update CORS settings for production frontend URL

### Frontend Deployment
- Build the production version: `npm run build`
- Deploy to platforms like **Vercel**, **Netlify**, or **GitHub Pages**
- Update API base URL in `main.jsx` for production backend

### Environment Variables for Production
```env
# Production Environment
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notetaking
JWT_SECRET=your-production-secret-key
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
```

### Deployment Checklist
- [ ] Set up production database (MongoDB Atlas)
- [ ] Configure environment variables
- [ ] Update CORS settings
- [ ] Set up Google OAuth for production domain
- [ ] Test all authentication flows
- [ ] Verify responsive design
- [ ] Check error handling
- [ ] Test note CRUD operations

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with email/password
- [ ] User login with email/password
- [ ] Google OAuth login
- [ ] Form validation (all fields)
- [ ] Error handling and messages
- [ ] Password strength indicator
- [ ] Smart redirects between pages
- [ ] Create, edit, delete notes
- [ ] Pin/unpin notes
- [ ] Search functionality
- [ ] Tag filtering
- [ ] Responsive design on different screen sizes
- [ ] Loading states and animations
- [ ] Toast notifications

### Error Scenarios to Test
- [ ] Invalid email format
- [ ] Weak passwords
- [ ] Password mismatch
- [ ] Duplicate email registration
- [ ] Invalid login credentials
- [ ] Network errors
- [ ] Server errors

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (when implemented)
```

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Code Style Guidelines
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent code formatting
- Use TypeScript for better type safety (optional)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Ensure responsive design works
- Test error handling scenarios

### Pull Request Template
- Description of changes
- Screenshots (if UI changes)
- Testing checklist
- Breaking changes (if any)

## 📝 License

This project is licensed under the **ISC License**.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible and powerful database
- **Express.js** - For the minimal and flexible web framework
- **All Contributors** - Thank you to all open-source contributors of the packages used

## 📞 Support

If you encounter any issues or have questions:

### Common Issues
- **CORS Errors**: Check your environment variables and CORS settings
- **Database Connection**: Verify MongoDB URI and network access
- **Google OAuth**: Ensure redirect URIs are correctly configured
- **Build Errors**: Check Node.js version and dependencies

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with detailed description
- Include steps to reproduce any bugs
- Provide error messages and screenshots

### Contact
- Create an issue for bug reports
- Use discussions for questions
- Follow the project for updates

---

**Built with ❤️ using modern web technologies**

*Last updated: January 2024*
```
