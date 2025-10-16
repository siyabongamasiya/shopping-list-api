# Shopping List API

A simple **TypeScript + Node.js API** that allows users to manage their shopping lists and items — create, read, update, and delete (CRUD) operations for both shopping lists and items.

---

## 📦 Project Overview

The **Shopping List API** helps users manage their shopping items easily. It stores shopping lists and items in in-memory arrays (simulating a lightweight database), allowing CRUD operations via HTTP routes.

---

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) shopping lists
- ✅ Add, Update, Delete items within a shopping list
- ✅ In-memory JSON-based data storage (no database setup required)
- ✅ TypeScript for type safety
- ✅ Simple and lightweight server built using Node's native http module
- ✅ Ready for testing with Thunder Client or Postman

---

## 🧩 Project Structure

shopping-list-api/
│
├── src/
│   ├── controllers/
│   │   ├── shoppingListController.ts
│   │   └── itemsController.ts
│   ├── data/
│   │   └── database.ts
│   ├── routes/
│   │   ├── shoppingListRoute.ts
│   │   └── itemsRoute.ts
│   ├── server.ts
│   └── types/
│       ├── shoppingList.ts
│       └── items.ts
│
├── package.json
├── tsconfig.json
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/siyabongamasiya/shopping-list-api.git
cd shopping-list-api

### 2️⃣ Install dependencies

npm install

### 3️⃣ Run the development server

npm run dev

This runs the app using nodemon and ts-node, watching for changes in the src/ directory.

### 4️⃣ Build for production

npm run build

Then run the compiled JavaScript:

npm start

---

## 🧠 API Endpoints

Base paths shown; adjust host/port to where your server runs (e.g. http://localhost:3000).

### 🧺 Shopping Lists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/lists` | Get all shopping lists |
| GET | `/lists/:id` | Get a single shopping list by ID |
| POST | `/lists` | Create a new shopping list |
| PUT | `/lists/:id` | Update a shopping list |
| DELETE | `/lists/:id` | Delete a shopping list |

### 🛍️ Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/items` | Get all items|
| GET | `/items/:shoppingListId` | Get all items in a shopping list |
| GET | `/items/:shoppingListId/:itemId` | Get a specific item by ID |
| POST | `/items` | Add a new item to a list (body must include shoppingListId) |
| PUT | `/items/:shoppingListId/:itemId` | Update an existing item |
| DELETE | `/items/:shoppingListId/:itemId` | Delete an item from a list |

---

## 🔁 Example Requests (Thunder Client / Postman)

Replace localhost:3000 with your server host if needed.

**Create shopping list**

POST http://localhost:3000/shopping-lists
Content-Type: application/json

{
  "title": "Weekly Groceries"
}

**Get all shopping lists**

GET http://localhost:3000/shopping-lists

**Get single shopping list**

GET http://localhost:3000/shopping-lists/191535

**Add item to list** (note shoppingListId in body)

POST http://localhost:3000/items
Content-Type: application/json

{
  "name": "Milk",
  "quantity": 2,
  "purchased": false,
  "shoppingListId": "191535"
}

**Get all items in list**

GET http://localhost:3000/items/191535

**Get single item**

GET http://localhost:3000/items/191535/123456

**Update item**

PUT http://localhost:3000/items/191535/123456
Content-Type: application/json

{
  "name": "Milk (2L)",
  "quantity": 1,
  "purchased": true
}

**Delete item**

DELETE http://localhost:3000/items/191535/123456

---

## 🧪 Example Test Objects

**POST /items body** (what to use in Thunder Client):

{
  "name": "Toothpaste",
  "quantity": 2,
  "purchased": false,
  "shoppingListId": "191535"
}

**Example ShoppingList object** (for testing GET /shopping-lists or POST /shopping-lists):

{
  "id": "191535",
  "title": "Weekly Groceries",
  "items": [],
  "createdAt": "2025-10-16T12:00:00.000Z",
  "updatedAt": "2025-10-16T12:00:00.000Z"
}

---

## 💡 Implementation Notes

- `id`, `createdAt`, and `updatedAt` are generated server-side.
- Items are stored in a global `items` array for quick lookup and also mirrored into the `items` array inside the corresponding `ShoppingList` object so both sources remain in sync.
- The `POST /items` route expects the `shoppingListId` as part of the request body (not the URL).
- For production use, replace in-memory arrays with a persistent database (e.g., SQLite, PostgreSQL, MongoDB).

---

## 🛠️ Technologies Used

- Node.js (HTTP server)
- TypeScript
- Nodemon
- ts-node
- Thunder Client / Postman

---

## 👨‍💻 Author

**Siyabonga Masiya**  
GitHub: https://github.com/siyabongamasiya