# DevTinder - Developer Networking Platform

A modern **Web application** that connects developers for professional networking and collaboration opportunities.  

The platform allows developers to **discover, connect, and collaborate** with peers in the tech industry.
---

## Key Features

### Authentication & Security
- **JWT-based Authentication** with secure token management  
- **Password Encryption** using `bcrypt` for enhanced security  
- **Cookie-based Session Management** for seamless user experience  
- **Input Validation** with comprehensive data sanitization  

### User Management
- **Rich User Profiles** with skills, bio, and professional information  
- **Profile Photo Support** with default avatar fallback  
- **Age & Gender Validation** with custom Mongoose validators  
- **Email Uniqueness** enforcement with automatic lowercase conversion  

### Smart Connection System
- **Connection Requests** with status tracking (*interested, ignored, accepted, rejected*)  
- **Bidirectional Relationship Management** preventing duplicate requests  
- **Self-Connection Prevention** with pre-save validation hooks  
- **MongoDB Indexing** for optimized query performance  

### RESTful API Architecture
- **Modular Route Structure** (auth, profile, request, user endpoints)  
- **Middleware Integration** for authentication and validation  
- **CORS Configuration** for frontend integration  
- **Error Handling** with comprehensive validation  

---

## Technology Stack

### Backend
- **Node.js** – Runtime environment  
- **Express.js** – Web application framework  
- **MongoDB** – NoSQL database with Mongoose ODM  
- **JWT** – JSON Web Token for authentication  
- **bcrypt** – Password hashing and encryption  

### Development Tools
- **Nodemon** – Development server with hot reloading  
- **dotenv** – Environment variable management  
- **CORS** – Cross-origin resource sharing  
- **cookie-parser** – HTTP cookie parsing middleware  

---

## API Endpoints

### Authentication
- **POST /auth/signup** – User registration with validation  
- **POST /auth/login** – User authentication with JWT  
- **POST /auth/logout** – Secure logout with cookie clearing  

### Profile Management
- **GET /profile/view** – View authenticated user profile  
- **PATCH /profile/edit** – Update user profile information  

### Connection Requests
- **POST /request/send/:status/:userId** – Send connection requests  
- **POST /request/review/:status/:requestId** – Accept/reject requests  

### User Discovery
- **GET /user/requests/received** – View incoming connection requests  
- **GET /user/connections** – View accepted connections  
- **GET /user/feed** – Discover new developers to connect with  

---

## Key Technical Implementations

### Database Design
- **User Schema** with comprehensive validation rules  
- **Connection Request Schema** with status enum validation  
- **Compound Indexing** for optimized relationship queries  
- **Pre-save Hooks** for business logic enforcement  

### Security Features
- **Password Hashing** with bcrypt salt rounds  
- **JWT Token Expiration** with 7-day validity  
- **Input Sanitization** and validation at schema level  
- **Protected Routes** with authentication middleware  

### Performance Optimizations
- **Database Indexing** on frequently queried fields  
- **Efficient Population** of referenced documents  
- **Modular Code Structure** for maintainability  
- **Error Handling** with appropriate HTTP status codes  

---

## Technical Highlights
- **Scalable Architecture** – Modular design with separation of concerns  
- **Data Integrity** – Comprehensive validation and error handling  
- **Security First** – JWT authentication with secure password handling  
- **Performance Optimized** – Strategic database indexing and efficient queries  
- **Production Ready** – Environment configuration and error management  

---

## Skills Demonstrated
- **Backend Development:** Express.js, Node.js, RESTful API design  
- **Database Management:** MongoDB, Mongoose ODM, schema design  
- **Authentication:** JWT implementation, password security  
- **Code Organization:** Modular architecture, middleware patterns  
- **Validation:** Input sanitization, business logic enforcement  
- **Performance:** Database optimization, efficient querying  

---

## Related Repositories
- **Frontend:** [DevTinder Frontend](https://github.com/Manojkrishnab/devtinder-web)
- **Backend:** (current repo)
