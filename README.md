FullStack Intern Coding Challenge
Tech Stack
Backend: Express.js / Loopback / NestJS (choose any one)
Database: PostgreSQL / MySQL
Frontend: React.js
Project Overview

This project is a web application that allows users to submit ratings for stores registered on the platform. Ratings range from 1 to 5.

A single login system is used for all users, with role-based access control determining available functionalities.

User Roles
System Administrator
Normal User
Store Owner
Features
1. System Administrator
Add new stores, normal users, and admin users
View dashboard with:
Total number of users
Total number of stores
Total number of submitted ratings
Add users with:
Name
Email
Password
Address
View stores list:
Name
Email
Address
Rating
View users list:
Name
Email
Address
Role
Apply filters on:
Name
Email
Address
Role
View user details:
Name
Email
Address
Role
If Store Owner → show rating
Logout
2. Normal User
Sign up and log in
Signup fields:
Name
Email
Address
Password
Update password
View all stores
Search stores by:
Name
Address
Store listing shows:
Store Name
Address
Overall Rating
User's Submitted Rating
Submit rating (1–5)
Modify submitted rating
Logout
3. Store Owner
Log in
Update password
Dashboard:
View users who rated their store
View average store rating
Logout
Form Validations
Name: 20–60 characters
Address: Maximum 400 characters
Password:
8–16 characters
At least one uppercase letter
At least one special character
Email: Must be valid email format
Additional Requirements
All tables must support:
Sorting (ascending/descending)
Follow best practices:
Clean architecture
Proper API design
Reusable components
Database schema should follow normalization and best practices
