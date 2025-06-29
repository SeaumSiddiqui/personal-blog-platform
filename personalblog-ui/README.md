# BlogHub - Modern Blog Management System

A production-ready blog management system built with React, TypeScript, and Tailwind CSS, featuring Keycloak authentication and role-based access control.

## 🚀 Features

### 🔐 Authentication & Authorization
- **Keycloak Integration** with OAuth2/OIDC flow
- **JWT Token Management** with automatic refresh
- **Role-Based Access Control** (web-admin permissions)
- **Secure Session Management**

### 📝 Blog Management
- **Create, Read, Update, Delete** blog posts
- **Markdown Editor** with live preview
- **Image Upload** with drag-and-drop support
- **Syntax Highlighting** for code blocks
- **Responsive Design** for all devices

### 🎨 User Experience
- **Dark/Light Theme** toggle
- **Advanced Filtering** and search
- **Pagination** with customizable page sizes
- **Social Sharing** capabilities
- **Professional UI/UX** design

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Keycloak (OAuth2/OIDC)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradients

## 📋 Prerequisites

- Node.js 18+ and npm
- Running Keycloak server
- Running Spring Boot backend

## 🔧 Environment Configuration

The application uses a single `.env` file for both development and production. Simply comment/uncomment the values you need.

### Development Setup
The `.env` file comes pre-configured for development. Just run:

```bash
npm install
npm run dev
```

### Production Setup
1. **Edit `.env` file** - Comment out development values and uncomment production values:

```env
# Application Environment
# VITE_APP_ENV=development
VITE_APP_ENV=production

# Keycloak Configuration
# Development values
# VITE_KEYCLOAK_URL=http://localhost:8080

# Production values (uncomment for production)
VITE_KEYCLOAK_URL=https://auth.yourdomain.com
```

2. **Replace `yourdomain.com`** with your actual domain

3. **Build the application**:
```bash
npm run build
```

## 🚀 Getting Started

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

## 🔐 Authentication Flow

### Public Access (No Authentication Required)
- View all blog posts
- Read individual blog posts
- Search and filter blogs

### Authenticated Access (Requires Login)
- All public features
- User profile management

### Web Admin Access (Requires 'web-admin' role)
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Full blog management capabilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── config/             # Configuration files (auth, api)
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API and auth services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Key Components

### Environment Configuration
- `.env` - Single environment file for all configurations
- `src/config/auth.ts` - Keycloak configuration from environment variables
- `src/config/api.ts` - API endpoints configuration from environment variables
- `src/vite-env.d.ts` - TypeScript declarations for environment variables

### Authentication System
- `useAuth` hook for authentication state management
- `AuthService` for Keycloak integration
- `ProtectedRoute` for route protection
- Automatic token refresh mechanism

### Blog Management
- `BlogEditor` with markdown support and live preview
- `BlogReader` with syntax highlighting
- `BlogCard` for blog post display
- Advanced filtering and pagination

### UI Components
- `ThemeToggle` for dark/light mode
- `UserMenu` for user management
- `ShareButton` for social sharing
- Responsive design components

## 🔒 Security Features

- **PKCE Flow** for secure OAuth2 authentication
- **JWT Token Validation** with automatic refresh
- **Role-Based Access Control** for protected features
- **CSRF Protection** with state parameter validation
- **Secure Token Storage** with automatic cleanup

## 🌐 API Integration

The application integrates with a Spring Boot backend with these endpoints:

### Public Endpoints
- `GET /blogs` - Get all blog posts with filtering
- `GET /blogs/{id}` - Get specific blog post

### Protected Endpoints (Require Authentication + web-admin role)
- `POST /blogs/protected` - Create new blog post
- `PUT /blogs/protected/{id}` - Update blog post
- `DELETE /blogs/protected/{id}` - Delete blog post
- `POST /files/upload-image` - Upload images
- `POST /files/upload-markdown` - Upload markdown files

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Optimized performance on all devices

## 🎨 Theming

- **Dark/Light Mode** with system preference detection
- **Custom Color Schemes** with CSS variables
- **Smooth Transitions** between theme changes
- **Consistent Design Language** across all components

## 🔄 State Management

- **React Hooks** for local state management
- **Context API** for global state (auth, theme)
- **Custom Hooks** for reusable logic
- **Optimistic Updates** for better UX

## 📊 Performance Optimizations

- **Code Splitting** with React.lazy
- **Image Optimization** with lazy loading
- **Bundle Optimization** with Vite
- **Caching Strategies** for API calls

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `VITE_APP_ENV` | Application environment | `development` | `production` |
| `VITE_KEYCLOAK_URL` | Keycloak server URL | `http://localhost:8080` | `https://auth.yourdomain.com` |
| `VITE_KEYCLOAK_REALM` | Keycloak realm name | `personalblog` | `personalblog` |
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID | `blog-ui` | `blog-ui` |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:9090` | `https://api.yourdomain.com` |

## 🚀 Deployment

### Quick Production Setup

1. **Edit `.env`** - Switch to production values:
```bash
# Comment out development values
# VITE_APP_ENV=development
# VITE_KEYCLOAK_URL=http://localhost:8080
# VITE_API_BASE_URL=http://localhost:9090

# Uncomment and update production values
VITE_APP_ENV=production
VITE_KEYCLOAK_URL=https://auth.yourdomain.com
VITE_API_BASE_URL=https://api.yourdomain.com
```

2. **Build**:
```bash
npm run build
```

3. **Deploy** the `dist/` folder to any static hosting service

### Deployment Platforms
- **Netlify**: Automatic deployment from Git
- **Vercel**: Zero-config deployment
- **AWS S3 + CloudFront**: Static hosting
- **Any static hosting service**

## ⚠️ Important Notes

- **Build-Time Variables**: Environment variables are embedded at build time, not runtime
- **Public Visibility**: All `VITE_*` variables are visible in the client-side code
- **No Secrets**: Never put sensitive data in these variables
- **Rebuild Required**: Changes to `.env` require a rebuild

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please refer to the project documentation or create an issue in the repository.

---

**Note**: This application uses Vite's environment variable system. All `VITE_*` prefixed variables are embedded into the build at build time and are visible in the client-side code. Never include sensitive secrets in these variables.