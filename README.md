# �� Modern Note Taking Application

A full-stack, production-ready note-taking application built with modern web technologies. Features comprehensive user authentication, advanced note management, and a beautiful responsive design that works seamlessly across all devices.

## 🌟 Key Features

### 🔐 Advanced Authentication System
- **Multi-Method Authentication**: Email/Password + Google OAuth
- **Email Verification**: 6-digit OTP system with 10-minute expiration
- **JWT Security**: Secure token-based authentication with 7-day expiration
- **Password Security**: bcrypt hashing with salt rounds
- **Account Linking**: Seamless Google account linking for existing users

### 📱 Responsive Note Management
- **CRUD Operations**: Create, Read, Update, Delete notes
- **Advanced Search**: Search across titles, content, and tags
- **Smart Organization**: Pin/unpin notes for quick access
- **Visual Organization**: 12 color-coded background options
- **Tag System**: Comma-separated tags for categorization
- **Dual View Modes**: Grid and List view options
- **Real-time Filtering**: Filter by tags, pinned status, and search terms
- **Sorting Options**: Sort by newest, oldest, or alphabetical

### 🎨 Modern UI/UX Design
- **Mobile-First Design**: Optimized for all screen sizes
- **Responsive Layout**: Adaptive grid (1-4 columns based on device)
- **Modern Aesthetics**: Clean, minimalist design with Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Toast Notifications**: Real-time user feedback
- **Accessibility**: Proper contrast, focus states, and keyboard navigation
- **Dark/Light Theme Ready**: Prepared for theme switching

### 🛡️ Enterprise-Grade Security
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Secure cross-origin request handling
- **Helmet.js**: Security headers protection
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error management and logging

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19.1.1**: Latest React with modern hooks and features
- **Vite 7.1.7**: Lightning-fast build tool and dev server
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **React Router 6.20.1**: Client-side routing
- **Axios 1.6.2**: HTTP client for API communication
- **React Hot Toast 2.4.1**: Beautiful toast notifications
- **Lucide React 0.294.0**: Modern icon library
- **React Google Login 5.2.2**: Google OAuth integration

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js 4.18.2**: Web application framework
- **MongoDB 8.0.3**: NoSQL database with Mongoose ODM
- **JWT 9.0.2**: JSON Web Token authentication
- **Passport.js 0.7.0**: Authentication middleware
- **Nodemailer 6.9.7**: Email service integration
- **Bcryptjs 2.4.3**: Password hashing
- **Express Validator 7.0.1**: Input validation
- **Helmet 7.1.0**: Security middleware
- **CORS 2.8.5**: Cross-origin resource sharing

### Development Tools
- **ESLint**: Code linting and formatting
- **Nodemon**: Development server auto-restart
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation & Setup

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

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/notetaking
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/notetaking

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Gmail Setup for OTP Emails

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in the `EMAIL_PASS` environment variable

#### Google OAuth Setup

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google+ API**:
   - Navigate to APIs & Services → Library
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**:
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → OAuth 2.0 Client IDs
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
   - Copy Client ID and Client Secret to your `.env` file

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

## 📱 Application Usage

### 1. User Registration
- Navigate to `/register`
- Fill in name, email, and password
- Verify email with 6-digit OTP sent to your inbox
- Alternative: Sign up using Google OAuth

### 2. User Login
- Navigate to `/login`
- Use email and password credentials
- Or continue with Google if previously signed up

### 3. Welcome Page (`/`)
- View user account information
- Access account status and verification details
- Navigate to Dashboard or logout

### 4. Dashboard (`/dashboard`)
- **View Notes**: Grid or List view modes
- **Search**: Real-time search across titles, content, and tags
- **Filter**: Filter by tags or pinned status
- **Sort**: Sort by newest, oldest, or alphabetical
- **Create**: Add new notes with rich metadata
- **Manage**: Edit, delete, or pin/unpin notes
- **Organize**: Use color coding and tags for organization

### 5. Note Management Features
- **Create**: Click "New Note" and fill in details
- **Edit**: Click edit icon on any note
- **Delete**: Click delete icon and confirm action
- **Pin**: Click pin icon to pin/unpin notes
- **Color**: Choose from 12 background colors
- **Tags**: Add comma-separated tags for categorization
- **Search**: Use search bar for instant filtering

## 🔗 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | User registration | No |
| `POST` | `/api/auth/verify-otp` | Email verification | No |
| `POST` | `/api/auth/resend-otp` | Resend OTP | No |
| `POST` | `/api/auth/login` | User login | No |
| `GET` | `/api/auth/google` | Google OAuth | No |
| `GET` | `/api/auth/google/callback` | OAuth callback | No |
| `GET` | `/api/auth/me` | Get current user | Yes |

### Notes Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/notes` | Get user's notes | Yes |
| `POST` | `/api/notes` | Create new note | Yes |
| `GET` | `/api/notes/:id` | Get single note | Yes |
| `PUT` | `/api/notes/:id` | Update note | Yes |
| `DELETE` | `/api/notes/:id` | Delete note | Yes |
| `GET` | `/api/notes/tags/all` | Get user's tags | Yes |

### Utility Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/health` | Health check | No |

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` (Primary actions, links)
- **Gray Scale**: 50-900 range for text and backgrounds
- **Note Colors**: 12 predefined background colors
- **Status Colors**: Green (success), Red (error), Yellow (warning)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Sizing**: Scales from mobile to desktop

### Component Library
- **Buttons**: Primary, Secondary variants with hover states
- **Input Fields**: Consistent styling with focus states
- **Cards**: Rounded corners with subtle shadows
- **Modals**: Backdrop blur with smooth animations

## 📁 Project Structure

```
assignment-2/
├── backend/                          # Backend application
│   ├── config/
│   │   └── passport.js            
```
