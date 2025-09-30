# �� Note Taking App

A modern, full-stack web application for creating and managing personal notes with secure authentication and beautiful UI.

## ✨ Features

- **🔐 Secure Authentication** - Email/password registration + Google OAuth login
- **📝 Note Management** - Create, edit, delete, and organize notes
- **🎨 Modern UI** - Responsive design with Tailwind CSS
- **🔒 JWT Security** - Token-based authentication with protected routes
- **📱 Mobile-First** - Fully responsive across all devices

## 🛠️ Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS, Axios, React Hot Toast  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Passport.js  
**Authentication:** Google OAuth 2.0, JWT tokens, bcrypt password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Google OAuth credentials

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd assignment-2
   npm run install-all
   ```

2. **Set up environment variables**
   ```bash
   # Copy backend/env.example to backend/.env
   cp backend/env.example backend/.env
   # Edit backend/.env with your values
   ```

3. **Configure Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:5000/api/auth/google/callback`

4. **Run the application**
   ```bash
   # Development mode (both frontend & backend)
   npm run dev
   
   # Or run separately:
   # Backend: cd backend && npm run dev
   # Frontend: cd frontend && npm run dev
   ```

5. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🌐 Deployment (Render)

### Single Service Deployment

This app is configured to deploy as a single service on Render:

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure environment variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   VITE_API_URL=https://your-app-name.onrender.com
   ```
4. **Set build and start commands:**
   - Build Command: `npm run build`
   - Start Command: `npm start`

### Google OAuth for Production

Update your Google OAuth settings:
- Add redirect URI: `https://your-app-name.onrender.com/api/auth/google/callback`
- Remove localhost URIs for production

## 📁 Project Structure

```
assignment-2/
├── backend/                 # Express.js API server
│   ├── config/passport.js   # Google OAuth config
│   ├── middleware/          # Auth & error handling
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   └── server.js           # Main server file
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

## �� API Documentation

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
