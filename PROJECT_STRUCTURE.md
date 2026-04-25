# Project Folder Structure and File Details

## Root Directory

- **eslint.config.mjs**: ESLint configuration for code linting and style enforcement.
- **next-auth.d.ts**: TypeScript declaration file for NextAuth types.
- **next-env.d.ts**: TypeScript environment definitions for Next.js.
- **next.config.ts**: Next.js configuration file.
- **package.json**: Project metadata and dependencies.
- **postcss.config.mjs**: PostCSS configuration for CSS processing.
- **README.md**: Project overview and instructions.
- **tsconfig.json**: TypeScript compiler configuration.
- **type.d.ts**: Custom TypeScript type definitions.

## app/

- **globals.css**: Global CSS styles for the application.
- **layout.tsx**: Root layout component for Next.js app directory.
- **page.tsx**: Main page component for the root route.

### app/api/

- **auth/**: Authentication-related API routes.
  - **[...nextauth]/route.ts**: NextAuth.js dynamic route handler for authentication.
  - **imagekit-auth/route.ts**: API route for ImageKit authentication.
  - **register/route.ts**: API route for user registration.
- **video/route.ts**: API route for video-related operations.

## lib/

- **auth.ts**: Authentication logic and helper functions.
- **db.ts**: Database connection and utility functions.

## models/

- **Users.ts**: Mongoose schema/model for users.
- **Video.ts**: Mongoose schema/model for videos.

## public/

- Static assets (images, icons, etc.) served publicly.

---

This document provides an overview of the folder structure and the purpose of each file in the project. Update as needed when new files or folders are added.
