# 🔗 URL Shortener

A production-grade URL shortening service built with Node.js and Express. It uses MongoDB (via Mongoose) for persistent storage and Redis for fast caching. Shortens long URLs and redirects users to the original address via a unique short code.

## 🚀 Features

- Shorten long URLs into short codes
- Redirect short codes to the original URL
- Caching layer with Redis for faster lookups
- Duplicate URL detection (avoid re-shortening)
- Error handling for invalid input
- REST API support
- Dockerized with Compose for easy development

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Cache Layer:** Redis
- **Hashing:** Base64 / crypto
- **Containerization:** Docker & Docker Compose

## 📦 Local Development

### 🔧 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### ▶️ Running with Docker Compose

```bash
docker-compose up --build
```

## API Endpoints

GET: localhost:3000/:shortCode

POST: localhost:3000/

{
    "original_url": "https://www.google.com",
    "expiry_date": "2025-05-22",
    "custom_alias": null
}
