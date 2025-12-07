# 📝 TODO APP – Backend API (Very Easy Guide for Frontend Developers)

Welcome!  
This is a **very simple and easy-to-understand** guide for using the Todo App backend APIs.  
Even if you don’t know backend, you can easily integrate these APIs in the frontend.

---

## 🌍 BASE URL (Backend Running Locally)

```
http://localhost:5000
```

All API routes start with:

```
/api
```

---

# ⭐ IMPORTANT RULE (PLEASE READ)

After login, you will receive a **JWT Token**.  
You MUST send this token in **all task-related API requests**.

Add this header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR…
```

If this header is missing, task APIs will NOT work.

---

# 👤 USER AUTHENTICATION APIs

These APIs are used for **signup**, **login**, and **reset password**.

---

## 1️⃣ SIGNUP (Create a new user)

**URL:** `POST /api/auth/signup`

### Request Body (JSON)
```json
{
  "name": "Your Name",
  "email": "test@example.com",
  "password": "123456"
}
```

### Success Response
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID_HERE",
    "name": "Your Name",
    "email": "test@example.com"
  },
  "token": "JWT_TOKEN_HERE"
}
```

---

## 2️⃣ LOGIN (Get your JWT Token)

**URL:** `POST /api/auth/login`

### Request Body
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### Success Response
```json
{
  "message": "Logged in successfully",
  "user": {
    "id": "USER_ID",
    "name": "Your Name",
    "email": "test@example.com"
  },
  "token": "JWT_TOKEN_HERE"
}
```

➡️ Save this token.  
➡️ Send it in headers while calling task APIs.

---

## 3️⃣ RESET PASSWORD (User must be logged in)

**URL:** `POST /api/auth/reset-password`  
**Header:** `Authorization: Bearer TOKEN`

### Request Body
```json
{
  "currentPassword": "oldpass",
  "newPassword": "newpass123"
}
```

### Response
```json
{
  "message": "Password updated successfully"
}
```

---

# 📝 TASK APIs (Create, Read, Update, Delete To-Dos)

👉 ALL these APIs need the **Authorization Token**.

Add header:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 4️⃣ CREATE TASK

**URL:** `POST /api/tasks`

### Request Body
```json
{
  "title": "Buy milk",
  "description": "Buy milk from supermarket"
}
```

### Response
```json
{
  "message": "Task created",
  "task": {
    "_id": "TASK_ID",
    "title": "Buy milk",
    "description": "Buy milk from supermarket",
    "completed": false
  }
}
```

---

## 5️⃣ GET ALL TASKS (User’s tasks only)

**URL:** `GET /api/tasks`

### Response
```json
{
  "tasks": [
    {
      "_id": "TASK_ID",
      "title": "Buy milk",
      "description": "Buy milk from supermarket",
      "completed": false
    }
  ]
}
```

---

## 6️⃣ GET SINGLE TASK BY ID

**URL:** `GET /api/tasks/:id`

Example:
```
GET /api/tasks/67a80c3c9d01c3e7b1c23711
```

### Response
```json
{
  "task": {
    "_id": "TASK_ID",
    "title": "Buy milk",
    "description": "Buy milk from supermarket",
    "completed": false
  }
}
```

---

## 7️⃣ UPDATE TASK

**URL:** `PUT /api/tasks/:id`

You may send **only the fields you want to update**.  
Missing fields stay unchanged.

### Example Request Body
```json
{
  "description": "Updated description"
}
```

### Response
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "TASK_ID",
    "title": "New title (if changed)",
    "description": "Updated description",
    "completed": false
  }
}
```

---

## 8️⃣ DELETE TASK

**URL:** `DELETE /api/tasks/:id`

Example:
```
DELETE /api/tasks/67a80c3c9d01c3e7b1c23711
```

### Response
```json
{
  "message": "Task deleted"
}
```

---

# 🎉 DONE!

You can now integrate all backend APIs easily.

If you need help with Axios functions or frontend integration, just ask!
