# 🛠️ Week 2 Express.js Assignment – Product API

## 📌 Overview

A RESTful API built with Express.js for managing product data.  
Includes CRUD operations, custom middleware (logger, auth, validation), filtering, pagination, search, and statistics.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- UUID
- Custom Middleware
- In-memory data store

---

## 📂 Project Structure
.
├── server.js
├── .env
├── routes/
│ └── products.js (if separated)
├── middleware/
│ ├── logger.js
│ ├── auth.js
│ └── validateProduct.js
├── .env.example
├── README.md


---

## 🔐 Authentication

Protected routes (`POST`, `PUT`, `DELETE`) require this header:


---

## 🧪 API Endpoints

| Method | Route                   | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/api/products`         | Get all products             |
| GET    | `/api/products/:id`     | Get product by ID            |
| POST   | `/api/products`         | Create new product *(auth)*  |
| PUT    | `/api/products/:id`     | Update product *(auth)*      |
| DELETE | `/api/products/:id`     | Delete product *(auth)*      |
| GET    | `/api/products/stats`   | Get total + count by category|

---

## 🔍 Filtering, Search & Pagination

You can use query parameters:

| Param         | Description                                 |
|---------------|---------------------------------------------|
| `search`      | Filter by product name/description (text)   |
| `category`    | Filter by category (e.g., electronics)      |
| `inStock`     | Filter by stock status (true/false)         |
| `page`, `limit` | Paginate results (e.g., `page=1&limit=5`) |

### Example:

```http
GET /api/products?search=laptop&category=electronics&inStock=true&page=1&limit=2

📊 Product Statistics
h
Copy
Edit
GET /api/products/stats

Sample Response:
{
  "total": 3,
  "countByCategory": {
    "electronics": 2,
    "kitchen": 1
  }
}

📥 Example Request
POST /api/products
Authorization: Bearer mysecrettoken123
Content-Type: application/json

{
  "name": "Tablet",
  "description": "10-inch Android tablet",
  "price": 400,
  "category": "electronics",
  "inStock": true
}


✅ How to Run the Server
Install dependencies: npm install
Start the server:npm start
Visit:http://localhost:5000

🧪 Tools for Testing
Postman

Insomnia

Thunder Client (VS Code Extension)

curl (command line)