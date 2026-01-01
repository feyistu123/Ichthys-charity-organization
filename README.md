🕊️ Ichthys Charity Full-Stack Project
This repository documents the evolution of the Ichthys Charity Management System, moving from a static prototype to a fully functional, secure MERN-style application.

📂 Project Structure
Phase 1: The Foundation 🏗️
Phase 1 focused on building the core structural elements and user interface prototypes.

Static UI Development: Created the initial landing pages, donation forms, and volunteer application layouts using HTML/CSS and basic JavaScript.

Local Storage: Initial data handling was performed client-side to simulate how information would flow before the backend was integrated.

Routing Logic: Established the basic site architecture and navigation flow for donors and volunteers.

Phase 2: The Full-Stack Transformation 🚀
Phase 2 introduced the robust backend infrastructure and security layers you see in the current version.

🏗️ Architecture Overview
Frontend: React.js with modular components for Registration, Login, Volunteer forms, and Donation tracking.

Backend: Node.js/HTTP server handling RESTful API requests and JWT-based security.

Database: MongoDB (Mongoose) utilizing relational links between users, donations, and volunteer applications.

🌟 Key Features
🔐 Secure Authentication & Authorization
JWT Protected Routes: Sensitive data like donation lists and volunteer contact info are locked behind a JSON Web Token (JWT) verification system.

Role-Based Access (RBAC): Distinct views for "Users" (can submit forms) and "Admins" (can view database records).

Admin Creation: Secure server-side validation for Admin account creation using a protected adminSecret.

🤝 Engagement Modules
Smart Volunteer Forms: Automatically validates if a volunteer has an existing account before allowing a submission, preventing anonymous spam.

Donation Tracking: Links financial contributions directly to the registered donor's profile.

Dynamic Validation: Real-time feedback if required fields like availability or email are missing during submission.

🚀 Getting Started
1. Backend Setup
Navigate to /backend and install dependencies: npm install.

Create a .env file with your MONGO_URI and JWT_SECRET.

Start the server: npm start (Runs on http://localhost:5000).

2. Frontend Setup
Navigate to /frontend and install dependencies: npm install.

Start the React app: npm start (Runs on http://localhost:3000).
