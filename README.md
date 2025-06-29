# Doctor-Patient Appointment Management System

A comprehensive Doctor-Patient Appointment Management System built with Node.js, Express, Mongoose, and TypeScript. This API allows patient and doctor to manage their appointment.

## Live URL

- [Live URL](https://doctor-patient-appointment-manageme.vercel.app/)

## Features

- **Create Patient**: Patient can create account.
- **Create Doctor**: Doctor can create account.
- **Create Admin**: Admin can create account.
- **Authentication**: Secure routes with JWT-based authentication.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Cloudinary**: For uploading image.
- **Zod**: TypeScript-first schema declaration and validation library.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gandib/Doctor-Patient-Appointment-Management-System
   ```

2. Install dependencies:

   ```bash
    cd Doctor-Patient-Appointment-Management-System
    npm install
   ```

Configuration:

Create a .env file in the root directory of projects and add the necessary configuration variables.

3. .env:

   ```bash
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=mongodb_url
    DCRYPT_SALT_ROUNDS=12
    JWT_ACCESS_SECRET=secret_token
    JWT_ACCESS_EXPIRE_IN=days
    CLOUD_NAME=cloudinary_environment_name
    API_KEY=cloudinary_api_key
    API_SECRET=cloudinary_environment_api_secret
   ```
