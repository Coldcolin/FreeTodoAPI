# Todo API

A Node.js-based Todo API with user authentication and email verification.

## Features

- User authentication (signup/login)
- Email verification
- Todo CRUD operations
- Trash functionality for todos
- JWT-based authentication
- MongoDB database
- Vercel deployment ready

## Local Development Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the following variables in `.env`:
  - `JWT_SECRET`: Your JWT secret key
  - `EMAIL_USER`: Your Gmail address
  - `EMAIL_PASS`: Your Gmail password or app-specific password
  - `MONGODB_URI`: Your MongoDB connection string (default: mongodb://localhost:27017/todo-api)

3. Start MongoDB:
Make sure MongoDB is running on your system.

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Configure Environment Variables on Vercel:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail password or app-specific password
     - `BASE_URL`: Your Vercel deployment URL

4. Deploy:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

## API Endpoints

### User Endpoints
- POST `/user/sign-up` - Register a new user
- POST `/user/log-in` - Login user
- GET `/user/verify-email` - Verify email address
- POST `/user/resend-verification-email` - Resend verification email

### Todo Endpoints
- POST `/create-todo` - Create a new todo (authenticated)
- GET `/get-one-todo/:todoId` - Get a specific todo
- GET `/get-all-todos` - Get all non-trash todos
- GET `/get-all-trash-todos` - Get all trash todos (authenticated)
- PATCH `/trash-todo/:todoId` - Move todo to trash (authenticated)
- PATCH `/update-todo/:todoId` - Update todo
- DELETE `/delete-todo/:todoId` - Permanently delete todo

## Authentication

For authenticated endpoints, include the JWT token in the Authorization header:
```
Authorization: Bearer your-token-here
```

## Important Notes for Production

1. Use MongoDB Atlas instead of a local MongoDB instance
2. Set up proper email service credentials
3. Use a strong JWT secret key
4. Configure CORS settings if needed
5. Set up proper error monitoring
