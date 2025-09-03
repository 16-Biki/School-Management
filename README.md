 🏫 School Management System

A **full-stack School Management System** built with:  
- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Database:** MySQL (Aiven Cloud MySQL in this project)  

This system allows adding schools with details like name, address, contact info, and **school images stored in MySQL**.

---

## 🚀 Features

- Add a new school with name, location, contact, and email  
- Upload and save images directly in MySQL (Base64 format)  
- View all schools in a clean UI  
- Full CRUD-ready API (extendable)  
- Deployable to **Render** (backend) and **Vercel** (frontend)  

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL (with `mysql2`)  
- **Image Upload:** Multer + Base64 storage  

---

## 📂 Project Structure

school-management/
│── backend/ # Express + MySQL API
│ ├── controllers/
│ ├── routes/
│ ├── db.js
│ ├── index.js
│── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── pages/
│ │ │ ├── AddSchool.jsx
│ │ │ ├── ShowSchools.jsx
│ ├── App.jsx
│ ├── main.jsx
│── README.md


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd school-management

2️⃣ Backend Setup

Go inside backend:

cd backend
npm install

Install required packages:

npm install express cors mysql2 multer dotenv

Create .env file:

PORT=5000
MYSQL_HOST=mysql-db-mahaldarbikram-16.d.aivencloud.com
MYSQL_PORT=21979
MYSQL_USER=avnadmin
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=defaultdb

Create table in MySQL:

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  contact VARCHAR(20),
  email_id VARCHAR(100),
  image LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Run backend:

npm start

3️⃣ Frontend Setup

Go inside frontend:

cd frontend
npm install

Run frontend locally:

npm run dev

🔗 API Endpoints
Add School

POST /api/schools

    Accepts multipart/form-data

    Fields: name, address, city, state, contact, email_id, image

Get All Schools

GET /api/schools
🌍 Deployment
Backend

    Deploy backend/ on Render as a web service

    Add .env values in Render Dashboard

Frontend

    Deploy frontend/ on Vercel

    Update API URLs in AddSchool.jsx & ShowSchools.jsx to use your Render backend

🖼️ Image Handling

    Images are uploaded via Multer in backend

    Converted into Base64 and stored in MySQL LONGTEXT column

    Retrieved and displayed directly in React with:

<img src={school.image} alt={school.name} />

✅ Example Flow

    Go to Add School page

    Fill details + upload image

    Submit → Data saved in MySQL

    Navigate to Show Schools → See list with image
