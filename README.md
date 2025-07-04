# Ultra-ship-backend || Employee Management App
This is a Node.js-based Employee Management application that allows you to manage employee records with features such as adding, updating, and viewing employees.

Prerequisites
Before you begin, make sure you have the following installed:

Node.js (version >= 12.x)

npm (Node Package Manager)

A MongoDB instance (either locally or through a service like MongoDB Atlas)

Getting Started
Clone the Repository

1. First, clone the repository to your local machine:
```
- git clone https://github.com/yourusername/employee-management.git
- cd employee-management
```
2. Install Dependencies
```
npm install
```

3. Configure Environment Variables
```
# .env file

# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/employeeDB

# Port for the Node.js application
PORT=5001

# JWT Secret for authentication (you can generate a secure key)
JWT_SECRET=your-secret-key

# Optional: Enable debugging
DEBUG=true

```

Explanation of Environment Variables:

MONGO_URI: Your MongoDB connection string. If you're using MongoDB locally, this will point to your local database (e.g., mongodb://localhost:27017/employeeDB). If using MongoDB Atlas, replace this with your MongoDB Atlas connection string.

PORT: The port where the app will run locally (default is 5001).

JWT_SECRET: A secret key used for signing JSON Web Tokens (JWT) for authentication.

DEBUG: (Optional) Set to true to enable debugging.

4. Start the Application
```
npm start

```
5. API Endpoints
```
Swagger docs available at http://localhost:5001/api-docs

```