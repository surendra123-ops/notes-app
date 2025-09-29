# Note Taking App

A modern, full-stack web application for creating, managing, and organizing personal notes with secure authentication and beautiful user interface.

## ✨ Features

### 🔐 Authentication
- **Email & Password Registration** - Simple and secure user registration
- **Google OAuth Integration** - One-click login with Google accounts
- **JWT Authentication** - Secure token-based authentication system
- **Protected Routes** - Route protection for authenticated users only
- **Auto-login** - Seamless login experience with persistent sessions

### 📝 Note Management
- **Create Notes** - Rich text note creation with titles and content
- **Edit & Update** - Real-time note editing and updates
- **Delete Notes** - Secure note deletion with confirmation
- **Pin Notes** - Pin important notes to the top for easy access
- **Color Coding** - Customize note colors for better visual organization
- **Tagging System** - Add and filter notes using custom tags
- **Search Functionality** - Powerful search through notes by title and content
- **Sorting Options** - Sort notes by date, title, or pinned status

### 🎨 User Interface
- **Responsive Design** - Perfect experience across desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **Grid & List Views** - Toggle between different note display modes
- **Real-time Notifications** - Toast notifications for all user actions
- **Loading States** - Smooth loading indicators for better UX
- **Error Handling** - User-friendly error messages and feedback

### 🔒 Security Features
- **Password Hashing** - Bcrypt with salt rounds for secure password storage
- **JWT Tokens** - Secure token-based authentication with expiration
- **Rate Limiting** - API rate limiting to prevent abuse
- **Input Validation** - Server-side validation for all user inputs
- **CORS Protection** - Configured CORS for secure cross-origin requests
- **Security Headers** - Helmet.js for additional security headers

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React with modern hooks
- **React Router DOM 6.20.1** - Client-side routing
- **Axios 1.6.2** - HTTP client for API communication
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Lucide React 0.294.0** - Beautiful, customizable icons
- **React Hot Toast 2.4.1** - Elegant toast notifications
- **Vite 7.1.7** - Lightning-fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Fast, unopinionated web framework
- **MongoDB** - Flexible NoSQL database
- **Mongoose 8.0.3** - Elegant MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - JSON Web Token implementation
- **Passport.js 0.7.0** - Authentication middleware
- **Bcryptjs 2.4.3** - Password hashing library
- **Express Validator 7.0.1** - Server-side validation
- **Helmet 7.1.0** - Security middleware
- **Express Rate Limit 7.1.5** - Rate limiting middleware

## 📁 Project Structure

```
assignment-2/
├── backend/
│   ├── config/
│   │   └── passport.js          # Google OAuth configuration
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js      # Global error handling
│   ├── models/
│   │   ├── User.js              # User schema and methods
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
│   │   │   ├── Login.jsx            # User login page
│   │   │   ├── Register.jsx         # User registration page
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

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new user | None |
| POST | `/login` | User login | None |
| GET | `/google` | Google OAuth login | None |
| GET | `/google/callback` | Google OAuth callback | None |
| GET | `/me` | Get current user info | Required |

### Notes Endpoints (`/api/notes`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/` | Get all user notes | Required |
| GET | `/:id` | Get single note | Required |
| POST | `/` | Create new note | Required |
| PUT | `/:id` | Update note | Required |
| DELETE | `/:id` | Delete note | Required |
| GET | `/tags/all` | Get all user tags | Required |

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
```

## 🔐 Authentication Flow

### Email/Password Registration
1. User submits registration form with name, email, and password
2. Backend validates input and creates user account
3. User account is immediately verified (no OTP required)
4. JWT token is generated and returned
5. User is automatically logged in and redirected to dashboard

### Google OAuth Flow
1. User clicks "Login with Google" button
2. Redirected to Google OAuth consent screen
3. After consent, redirected back with authorization code
4. Backend exchanges code for user profile information
5. User account is created/linked automatically
6. JWT token is issued and user is logged in

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach ensuring perfect experience on all devices
- **Modern Interface**: Clean, minimalist design with smooth animations and transitions
- **User Feedback**: Comprehensive toast notifications for all user actions
- **Loading States**: Proper loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages with clear instructions
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1200px and above - Full feature set with sidebar navigation
- **Tablet**: 768px - 1199px - Optimized layout with touch-friendly controls
- **Mobile**: 320px - 767px - Mobile-first design with collapsible navigation

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

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with email/password
- [ ] User login with email/password
- [ ] Google OAuth login
- [ ] Create, edit, delete notes
- [ ] Pin/unpin notes
- [ ] Search functionality
- [ ] Tag filtering
- [ ] Responsive design on different screen sizes
- [ ] Error handling and validation

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
- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with detailed description
- Include steps to reproduce any bugs

---

**Built with ❤️ using modern web technologies**
```
