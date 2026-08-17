# 💼 JobNest - Online Job Board

JobNest is a full-stack job board platform developed as part of the CODSOFT Web Development Internship.

The platform allows employers to post job openings and candidates to search and apply for jobs.

---

## 🚀 Features

### Home Page
- Welcome section
- Featured jobs
- Job search
- Responsive design

### Authentication
- Candidate registration
- Employer registration
- Secure login
- JWT authentication
- Password hashing with bcrypt

### Job Listings
- Browse jobs
- Search jobs
- Search by location
- Filter by job type
- View job details

### Employer Dashboard
- Create job postings
- View posted jobs
- Delete jobs
- View candidates
- Update application status

### Candidate Dashboard
- View applications
- Track application status
- Apply for jobs
- Upload resume

### Job Application
- Candidate details
- Phone number
- Cover letter
- Resume upload
- Application tracking

### Security
- JWT authentication
- Password hashing
- Role-based authorization
- Protected API routes
- File upload restrictions

### Responsive Design
Works on:
- Desktop
- Laptop
- Tablet
- Mobile

---

## 🛠️ Technologies

### Frontend
- React
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT
- Multer
- bcrypt

### Database
- MongoDB
- Mongoose

---

## 📁 Project Structure

```text
job-board/
│
├── client/
│   ├── package.json
│   └── src/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
