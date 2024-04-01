# CrowdFlow Ticketing System

## Overview
CrowdFlow is an advanced ticketing system engineered for music venues, offering personalized service to fans. Developed for the LIVE Life Showbox theater, a 1500 seat music-only venue, CrowdFlow integrates various functionalities to streamline ticket sales, event management, and customer engagement through a well-structured and normalized database.

## Key Database Features
- **Third Normal Form (3NF) Achieved:** Through rigorous peer reviews and iterative refinements, the database has been normalized to 3NF, ensuring data integrity, reducing redundancy, and improving query performance.
- **Scalable Data Model:** Designed to handle over 1,000,000 fan records, 7500 event records, and 5000 employee records, supporting the venue's growth and data accumulation over a 10-year period.
- **Comprehensive Entity Relationships:** The database encompasses a wide range of entities like Tickets, Events, Fans, Employees, and Job Titles, with well-defined relationships supporting complex queries and operational requirements.
- **Data Integrity and Consistency:** Implementing strict constraints and relational structures to maintain accurate and consistent data across the system.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL, with a focus on advanced normalization and relational integrity

## Installation and Setup
1. Clone the repository:
2. Navigate to the project directory and install dependencies:
3. Initialize the MySQL database using the provided schema and seed data to set up a normalized database environment.
4. Configure environment variables for database connection and server settings in the `.env` file.
5. Launch the server with `npm start`
6. Visit `http://localhost:3000` (or your configured port) to access the admin interface.

## System Usage
Through the admin interface, users can:
- Manage events, tickets, employees, and customer data effectively.
- Utilize the normalized database structure for efficient data retrieval and management.
- Access comprehensive reports and analytics derived from the normalized data.
