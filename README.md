# Note Taking Application

A full-stack note-taking application built with React, Node.js, and MongoDB. Features user authentication, note management, and a modern responsive design.

## 🚀 Features

### Authentication
- **Email/Password Registration** with OTP verification
- **Google OAuth Integration** for seamless sign-in
- **JWT-based Authentication** for secure API access
- **Email Verification** with 6-digit OTP codes

### Note Management
- **Create, Read, Update, Delete** notes
- **Search functionality** across titles, content, and tags
- **Pin/Unpin notes** for quick access
- **Color coding** for visual organization
- **Tag system** for categorization
- **Responsive design** for mobile and desktop

### User Experience
- **Modern UI/UX** with Tailwind CSS
- **Real-time notifications** with toast messages
- **Loading states** and error handling
- **Mobile-friendly** responsive design
- **Dark/Light theme** support

## 🛠️ Technology Stack

### Frontend
- **React 19** with JavaScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Passport.js** for Google OAuth
- **Nodemailer** for email services
- **Express Validator** for input validation
- **Helmet** for security
- **CORS** for cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd assignment-2
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Environment Configuration

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/notetaking

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Gmail Setup for OTP Emails

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS`

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
5. Copy Client ID and Client Secret to your `.env` file

#### Start Backend Server

```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## 📱 Usage

### 1. Registration
- Navigate to the registration page
- Fill in your name, email, and password
- Verify your email with the OTP sent to your inbox
- Or sign up using Google OAuth

### 2. Login
- Use your email and password to log in
- Or continue with Google if you signed up with Google

### 3. Dashboard
- View all your notes in a responsive grid layout
- Use the search bar to find specific notes
- Pin important notes for quick access
- Create new notes with the "New Note" button

### 4. Note Management
- **Create**: Click "New Note" and fill in the details
- **Edit**: Click the edit icon on any note
- **Delete**: Click the delete icon and confirm
- **Pin**: Click the pin icon to pin/unpin notes
- **Search**: Use the search bar to filter notes
- **Color**: Choose from 8 different background colors
- **Tags**: Add comma-separated tags for organization

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get single note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/notes/tags/all` - Get user's tags

## 🎨 Design Features

- **Modern UI** with clean, minimalist design
- **Responsive Layout** that works on all devices
- **Smooth Animations** and transitions
- **Intuitive Navigation** with clear visual hierarchy
- **Accessible Design** with proper contrast and focus states
- **Loading States** and error handling
- **Toast Notifications** for user feedback

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Input Validation** on both frontend and backend
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for secure cross-origin requests
- **Helmet.js** for security headers
- **Environment Variables** for sensitive data

## 📁 Project Structure

```
assignment-2/
├── backend/
│   ├── config/
│   │   └── passport.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── utils/
│   │   └── emailService.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AuthCallback.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   └── Welcome.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect your GitHub repository
4. Deploy the backend

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update the `FRONTEND_URL` in backend environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check the `MONGODB_URI` in your `.env` file

2. **Email Not Sending**
   - Verify Gmail credentials in `.env`
   - Ensure 2FA is enabled and app password is correct

3. **Google OAuth Not Working**
   - Check Google Cloud Console settings
   - Verify redirect URI matches exactly

4. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in components

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] Note sharing functionality
- [ ] Rich text editor with formatting
- [ ] File attachments
- [ ] Note categories and folders
- [ ] Export notes to PDF
- [ ] Dark mode toggle
- [ ] Offline support with PWA
- [ ] Note collaboration features
- [ ] Advanced search filters
- [ ] Note templates

---

**Happy Note Taking! 📝**

This README file provides comprehensive documentation for your note-taking application, including setup instructions, features, API documentation, and troubleshooting tips. It's structured to help both developers and users understand and use the application effectively.
