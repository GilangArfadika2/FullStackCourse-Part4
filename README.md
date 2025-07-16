# Full Stack Open 2025 – Part 4 Submission

This repository contains my solutions for **Part 4** (Testing Express servers, user administration) of the [Full Stack Open](https://fullstackopen.com/en/) course offered by the University of Helsinki.

## ✅ Completed Exercises

I have completed and submitted all **mandatory exercises** for Part 4:  
**4.1 – 4.4**, **4.8 – 4.10**, **4.13 – 4.15**, and **4.17 – 4.19**.

These exercises focus on:
- Building and testing a RESTful Blog API using **Node.js**, **Express**, and **MongoDB**
- Writing **unit and integration tests** using **node:test** and **Supertest**
- Structuring a testable backend using modular design principles

## 📁 Folder Structure

All the exercises are organized within a single project directory (`blog_backend`) representing the full backend of the Blog List application.

Example folder layout:

<pre><code> 
blog_backend/
├── controllers/
├── models/
├── tests/
├── utils/
├── app.js
├── index.js
├── .env
└── ...
</code></pre>

## ▶️ How to Run the Project

To run the backend server:

1. Navigate to the project folder:

   ```bash
   cd blog_backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

4. Run the test suite:

   ```bash
   npm test
   ```

Make sure you have a `.env` file with the correct MongoDB URI and port configuration.

---

Thanks for reviewing my Part 4 submission!
