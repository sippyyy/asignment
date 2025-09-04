# Test Suite Documentation

This document describes the testing setup and organization for the Next.js application.

## 📁 Test Structure

```
__tests__/
├── components/          # Component tests
├── hooks/              # Custom hook tests  
├── store/              # Zustand store tests
├── utils/              # Utility function tests
└── README.md           # This documentation
```

## 🧪 Test Setup

### Dependencies
- **Jest** - Testing framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **@testing-library/user-event** - User interaction simulation

### Configuration
- `jest.config.js` - Jest configuration with Next.js integration
- `jest.setup.js` - Global test setup and mocks

### Scripts
- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 📋 Test Coverage

### ✅ **Store Tests** (`__tests__/store/`)

#### `authStore.test.ts`
- **Purpose**: Tests authentication state management
- **Coverage**: Login, logout, error handling, state transitions
- **Key Tests**: Valid/invalid credentials, error clearing, logout cleanup

#### `usersStore.test.ts` 
- **Purpose**: Tests user data management
- **Coverage**: User validation, adding users, finding users by email
- **Key Tests**: Credential validation, user lookup, duplicate handling

#### `searchStore.test.ts`
- **Purpose**: Tests search query state management  
- **Coverage**: Setting search query, clearing search, state persistence
- **Key Tests**: Query updates, empty handling, multiple updates

### ✅ **Component Tests** (`__tests__/components/`)

#### `SearchContent.test.tsx`
- **Purpose**: Tests complex search UI behavior (with mocking limitations)
- **Coverage**: Filter rendering, search state integration, UI interactions
- **Note**: Basic rendering tests due to Zustand mocking complexity

#### `CommentItem.test.tsx`
- **Purpose**: Tests individual comment rendering
- **Coverage**: Comment display, edge cases, special characters
- **Key Tests**: Name/body rendering, empty content, long content

#### `LoginForm.test.tsx`
- **Purpose**: Tests complex login/register form functionality
- **Coverage**: Form rendering, validation, submission, remember me, form switching
- **Key Tests**: Login/register modes, Yup validation, localStorage, authentication flow

### ✅ **Utility Tests** (`__tests__/utils/`)

#### `api.test.ts`
- **Purpose**: Tests API configuration and URL building
- **Coverage**: Endpoint URLs, parameter handling, edge cases
- **Key Tests**: URL construction, ID parameters, helper functions

#### `searchLogic.test.ts`
- **Purpose**: Tests core search filtering algorithms
- **Coverage**: Multi-filter search, single filter search, case sensitivity
- **Key Tests**: Post/Title/Username filtering, partial matches, empty states

#### `validationSchemas.test.ts`
- **Purpose**: Tests form validation logic
- **Coverage**: Email validation, password rules, confirmation matching
- **Key Tests**: Valid/invalid formats, required fields, password confirmation

### ✅ **Hook Tests** (`__tests__/hooks/`)

#### `useGetAllPosts.test.tsx`
- **Purpose**: Tests API data fetching with React Query
- **Coverage**: Successful requests, error handling, loading states
- **Key Tests**: Fetch success, network errors, malformed responses

## 🔧 Mocking Strategy

### Global Mocks (`jest.setup.js`)
- **Next.js Router** - `useRouter`, `useSearchParams`, `usePathname`
- **Environment Variables** - `NEXT_PUBLIC_API_URL`
- **Browser APIs** - `fetch`, `IntersectionObserver`, `localStorage`

### Component-Specific Mocks
- **Zustand Stores** - Mocked where needed for isolation
- **API Responses** - Fetch responses mocked for predictable testing

## 📊 Current Test Statistics

- **Test Suites**: 10 passed
- **Total Tests**: 104 passed  
- **Coverage**: Core business logic and critical components
- **Success Rate**: 100%

## 🎯 Testing Philosophy

### What We Test
1. **Business Logic** - Core functionality like authentication and search
2. **State Management** - Zustand store behavior and state transitions
3. **API Integration** - Data fetching and error handling
4. **Component Rendering** - Critical UI components and edge cases
5. **Validation Logic** - Form validation and data integrity

### What We Don't Over-Test  
1. **UI Implementation Details** - Focus on behavior over implementation
2. **Third-Party Libraries** - Trust library functionality, test integration
3. **Styling** - CSS classes tested minimally, focus on functionality

## 🚀 Running Tests

### Basic Usage
```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test __tests__/store/authStore.test.ts
```

### Debugging Tests
```bash
# Run tests with verbose output
npm test -- --verbose

# Run only failing tests
npm test -- --onlyFailures

# Run tests matching pattern
npm test -- --testNamePattern="login"
```

## 📈 Future Test Additions

Consider adding tests for:
- **Integration Tests** - Full user workflows (login → search → comment)
- **Performance Tests** - Large dataset handling in infinite scroll
- **Accessibility Tests** - Screen reader compatibility
- **Mobile Interaction Tests** - Touch events and responsive behavior

## 🛠️ Maintenance

### When Adding New Features
1. **Create tests first** (TDD approach when possible)
2. **Follow existing patterns** in the appropriate test directory
3. **Update this documentation** if test structure changes
4. **Maintain high coverage** for critical business logic

### When Tests Fail
1. **Check implementation changes** - Tests may need updates
2. **Review mock validity** - Ensure mocks still match real behavior  
3. **Update test data** - Keep test fixtures current with app changes
4. **Consider test value** - Remove obsolete tests, add missing coverage

---

✨ **Happy Testing!** - Your application now has a solid foundation of automated tests covering the most critical functionality. 