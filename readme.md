# Library Management API

## Live Link

```bash
https://assignment-3-0-gules.vercel.app/api/books
```

A simple and efficient **RESTful API** built using **Node.js**, **Express**, and **MongoDB** to manage a library system. This system allows users to manage books and borrowing operations, with features like CRUD operations, filtering, sorting, and aggregation of borrowed records.

---

## Features

- Add, view, update, and delete books
- Filter and sort books by genre, availability, or creation date
- Borrow books with due dates and quantity tracking
- Aggregation for borrowed book summaries (total quantity borrowed per book)
- Automatic timestamps (createdAt, updatedAt)
- Error handling and HTTP status codes

---

```markdown
## Project Structure

src/
│
├── controllers/ # Route handlers (books & borrows)
├── models/ # Mongoose models (Book, Borrow)
├── db/ # MongoDB connection
├── interface/ # Interface definitions
├── routers/ # Express routes
└── index.ts # App entry point

---

## Tech Stack

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **TypeScript** for type safety
- **ts-node-dev** for development
- **dotenv** for environment variables
```

## Installation

```bash
git clone https://github.com/muhammadranju/library-management-api.git
```

```bash
cd library-management-api
```

```bash
npm install
```

---

## ▶ Running the Server

```bash
npm run dev
```

Make sure MongoDB is running locally or update the connection string in your `.env`.

---

## API Endpoints

### Books

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| GET    | `/api/books`     | Get all books (supports filtering/sort) |
| GET    | `/api/books/:id` | Get a single book by ID                 |
| POST   | `/api/books`     | Create a new book                       |
| PATCH  | `/api/books/:id` | Update an existing book                 |
| DELETE | `/api/books/:id` | Delete a book                           |

#### Example with filtering/sorting

```http
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

- `filter`: Filter by genre (e.g., FANTASY)
- `sortBy`: Field to sort by (e.g., createdAt)
- `sort`: Sort direction (`asc` or `desc`)
- `limit`: Number of records to return

---

### Borrows

| Method | Endpoint      | Description                               |
| ------ | ------------- | ----------------------------------------- |
| GET    | `/api/borrow` | Get all borrows (aggregated book summary) |
| POST   | `/api/borrow` | Create a borrow request                   |

#### Aggregated Borrow Summary

Returns total quantity borrowed for each book:

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780501653383"
    },
    "totalQuantity": 5
  }
]
```

---

## Book Model

```ts
{
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  description: string;
  available: boolean;
}
```

---

## Borrow Model

```ts
{
  book: ObjectId; // Reference to Book
  quantity: number;
  dueDate: Date;
}
```

---

## Sample Book JSON

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780501653383",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
