# 🚀 Next.js Social Media Dashboard

A modern, responsive social media dashboard built with Next.js, featuring authentication, post management, search functionality, and real-time interactions.

## ✨ Features

### 🔐 **Authentication System**
- **Login/Register Forms** with `react-hook-form` and `Yup` validation
- **Remember Me** functionality (saves username to localStorage)
- **Protected Routes** with authentication interceptors
- **Zustand State Management** for auth state persistence

### 🔍 **Advanced Search**
- **Multi-filter Search** - Search by Post content, Title, or Username
- **Real-time Filtering** - Instant results as you type
- **Filter Toggle** - Enable/disable search criteria dynamically
- **Case-insensitive** search with partial word matching

### 📱 **Responsive Design**
- **Mobile-first** approach with Tailwind CSS v4
- **Custom Theme** - Beautiful color palette and typography
- **Glass-morphism** effects and modern UI components
- **Responsive Header** with burger menu for mobile

### 📊 **Content Management**
- **Infinite Scroll** - Loads posts efficiently as you scroll
- **Authentication Required** - First 15 posts public, more require login
- **Comment System** - View and add comments to posts
- **Post Display** - Clean, organized post cards with user info

### 🎨 **Modern Tech Stack**
- **Next.js 15** with Turbopack for fast development
- **Tailwind CSS v4** with CSS-first configuration
- **TypeScript** for type safety
- **React Query** for data fetching and caching
- **Zustand** for lightweight state management
- **Lucide React** for beautiful icons

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/sippyyy/asignment.git
cd my_assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### **Environment Variables**
Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```
*Note: Fallback URL is configured if env variable is not set*

## 📁 Project Structure

```
my_assignment/
├── src/app/
│   ├── components/           # Reusable UI components
│   │   ├── SearchContent.tsx # Advanced search interface
│   │   ├── PostComments.tsx  # Comment display & management
│   │   └── CommentItem.tsx   # Individual comment component
│   ├── reusableComponents/   # Base UI components
│   │   ├── Header.tsx        # Responsive navigation
│   │   ├── StyledTextField.tsx # Custom input field
│   │   └── StyledButton.tsx  # Custom button component
│   ├── login/               # Authentication pages
│   │   ├── page.tsx         # Login page layout
│   │   ├── components/      # Login-specific components
│   │   ├── constants.ts     # Validation schemas
│   │   └── types.ts         # Authentication types
│   ├── store/               # Zustand state management
│   │   ├── authStore.ts     # Authentication state
│   │   ├── usersStore.ts    # User data management
│   │   └── searchStore.ts   # Search query state
│   ├── hooks/api/           # React Query hooks
│   │   ├── useGetAllPosts.tsx
│   │   └── useGetPostComments.tsx
│   ├── config/              # Configuration files
│   │   ├── api.ts           # API endpoints & URL builders
│   │   └── interceptors.ts  # Authentication interceptors
│   ├── constants/           # Application constants
│   └── providers/           # React providers setup
└── __tests__/               # Comprehensive test suite
    ├── components/          # Component tests
    ├── store/              # Store tests  
    ├── hooks/              # Hook tests
    └── utils/              # Utility tests
```

## 🎯 Key Features Deep Dive

### **🔐 Authentication Flow**
```typescript
// Login with validation
const loginData = { email: 'user@example.com', password: 'password123' }
const success = useAuthStore().login(loginData)

// Remember me functionality
localStorage.setItem('rememberedEmail', email) // Auto-fills on next visit
```

### **🔍 Smart Search System**
```typescript
// Multi-criteria search
searchFilters = ['Post', 'Title', 'Username']
// Searches in: post.body OR post.title OR `user${post.userId}`

// Single-criteria search  
searchFilters = ['Post'] 
// Searches only in: post.body
```

### **📊 Infinite Scroll with Auth**
```typescript
// Public access: First 15 posts
// Authentication required: Additional posts
const isAuthenticated = useAuthStore().isAuthenticated
if (!isAuthenticated && displayedPosts.length >= 15) {
  console.log("Authentication required for more posts")
}
```

## 🧪 Testing

### **Test Coverage**
- **104 Tests** across **10 Test Suites**
- **100% Success Rate** with comprehensive coverage
- **Critical Components** - LoginForm, SearchContent, PostComments
- **Business Logic** - Authentication, search filtering, validation
- **API Integration** - Data fetching, error handling
- **State Management** - All Zustand stores tested

### **Running Tests**
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# Run specific test file
npm test __tests__/components/LoginForm.test.tsx
```

## 🔧 Development

### **Available Scripts**
```bash
npm run dev         # Start development server with Turbopack
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm test            # Run test suite
npm run test:watch  # Test watch mode
npm run test:coverage # Test coverage report
```

### **Key Technologies**

| Technology | Purpose | Configuration |
|------------|---------|---------------|
| **Next.js 15** | React framework | `next.config.ts` |
| **Tailwind CSS v4** | Styling | `@theme` in `globals.css` |
| **TypeScript** | Type safety | `tsconfig.json` |
| **Jest** | Testing | `jest.config.js` + `jest.setup.js` |
| **React Query** | Data fetching | `QueryProvider.tsx` |
| **Zustand** | State management | Lightweight stores |

## 🎨 Design System

### **Custom Theme Colors**
```css
--color-main-linen: #f7f3e3    /* Light background */
--color-main-venice: #8b4513   /* Primary text */
--color-main-shine: #ff6b35    /* Accent color */
```

### **Typography Scale**
```css
--font-size-sm: 0.875rem       /* Small text */
--font-size-md: 1rem           /* Body text */
--font-size-title-sm: 1.125rem /* Small headings */
--font-size-title-xl: 2.25rem  /* Large headings */
```

### **Spacing System**
```css
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-xxl: 2rem     /* 32px */
```

## 📡 API Integration

### **Endpoints** (JSONPlaceholder)
```typescript
// Posts
GET /posts              # Get all posts
GET /posts/{id}         # Get specific post
GET /posts/{id}/comments # Get post comments

```

### **API Configuration**
```typescript
// Auto-configured base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'

// Helper functions
apiUrls.getAllPosts()           // -> /posts
apiUrls.getPostComments(1)      // -> /posts/1/comments
```

## 🔒 Security Features

### **Authentication Interceptors**
```typescript
// Automatic auth checking for protected endpoints
const response = await withAuthInterceptor(() => fetch(url))
```

### **Input Validation**
```typescript
// Yup schemas for form validation
authenticationInfoSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})
```

## 📱 User Experience

### **Responsive Breakpoints**
- **Mobile** - Single column, burger menu
- **Tablet** - Optimized layout, expanded search
- **Desktop** - Full header, side-by-side layouts

### **Interactive Elements**
- **Hover Effects** - Buttons, links, post cards
- **Loading States** - Skeleton screens, spinners
- **Error Handling** - User-friendly error messages
- **Empty States** - Helpful guidance when no content

## 🚀 Deployment

### **Build for Production**
```bash
npm run build    # Creates optimized production build
npm start        # Serves production build locally
```

### **Environment Setup**
1. **Set API endpoint** in production environment
2. **Configure authentication** as needed
3. **Test responsive design** across devices

## 🔮 Future Enhancements

### **Potential Features**
- **Real API Integration** - Replace JSONPlaceholder
- **User Profiles** - Detailed user information pages
- **Post Creation** - Allow users to create new posts
- **Real-time Updates** - WebSocket integration
- **Image Upload** - Media handling for posts
- **Dark Mode** - Theme switching capability
- **Left Content** - Maybe friend's activities
- **Right Content** - Promotion

### **Performance Optimizations**
- **Virtual Scrolling** - For large datasets
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Route-based lazy loading
- **CDN Integration** - Static asset optimization

## 📋 Development Guidelines

### **Component Patterns**
- **React Functional Components** with hooks
- **TypeScript Interfaces** for all props
- **Zustand Stores** for state management
- **React Query** for server state

### **Testing Strategy**
- **Unit Tests** - Individual components and functions
- **Integration Tests** - Store interactions and API calls
- **Mock Strategy** - Comprehensive mocking for isolation
- **Test Organization** - Structured by feature/type

## 💡 Getting Started

### **First Time Setup**
1. **Clone & Install** - `git clone` → `npm install`
2. **Start Development** - `npm run dev`  
3. **Login** - Use test credentials: `test123@gmail.com` / `123456`
4. **Explore Features** - Search posts, view comments, infinite scroll

### **Development Workflow**
1. **Feature Development** - Create components in appropriate folders
2. **Write Tests** - Add tests in `__tests__/` mirroring structure
3. **Run Tests** - `npm run test:watch` during development
4. **Type Safety** - Ensure TypeScript compliance
5. **Responsive Testing** - Test across device sizes

---

## 📞 Support

For questions or issues:
- **Check Test Suite** - Comprehensive examples in `__tests__/`
- **Review Components** - Well-documented component structure
- **API Documentation** - JSONPlaceholder API reference

---

**Built with ❤️ using Next.js, TypeScript, and modern React patterns**

*Ready for production deployment and feature expansion!* 🌟
