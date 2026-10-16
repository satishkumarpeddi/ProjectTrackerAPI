# ProjectTrackerAPI

A RESTful Project Management API built with **Node.js, Express.js, and JavaScript**. This project provides CRUD operations to create, retrieve, update, and delete projects using JSON-file storage.

## Features

- **Create projects** — Add a project with a title, description, and status.
- **Retrieve projects** — Fetch all projects or retrieve one by its ID.
- **Update projects** — Modify an existing project's details.
- **Delete projects** — Remove a project by its ID.
- **RESTful endpoints** — Organize operations using HTTP methods and resource-based routes.
- **JSON middleware** — Parse incoming JSON request bodies.
- **Error handling** — Return appropriate responses for missing projects.

## Tech Stack

- Node.js
- Express.js
- Zod — Input validation dependency
- JSON file — Local data persistence
- Docker — Containerization

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) (Node.js 22 recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/satishkumarpeddi/ProjectTrackerAPI.git
cd ProjectTrackerAPI
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Start the server

If your entry point is `src/server.js`, run:

```bash
node src/server.js
```

The API uses port `3000` by default. You can override it with the `PORT` environment variable.

```bash
PORT=4000 node src/server.js
```

The API will be available at `http://localhost:3000` when using the default port.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/projects` | Retrieve all projects |
| `GET` | `/projects/:id` | Retrieve a project by ID |
| `POST` | `/projects` | Create a new project |
| `PUT` | `/projects/:id` | Update an existing project |
| `DELETE` | `/projects/:id` | Delete a project by ID |

## Request Examples

### Create a project

**POST** `/projects`

Request body:

```json
{
  "title": "Portfolio Website",
  "description": "Build a responsive personal portfolio",
  "status": "in-progress"
}
```

Example response:

```json
{
  "id": 12345,
  "title": "Portfolio Website",
  "description": "Build a responsive personal portfolio",
  "status": "in-progress"
}
```

The ID above is illustrative; the API generates an ID when creating a project.

### Retrieve all projects

```bash
curl http://localhost:3000/projects
```

### Retrieve a project by ID

Replace `12345` with an existing project ID.

```bash
curl http://localhost:3000/projects/12345
```

### Update a project

```bash
curl -X PUT http://localhost:3000/projects/12345 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Portfolio Website",
    "description": "Improve the design and responsiveness",
    "status": "completed"
  }'
```

### Delete a project

```bash
curl -X DELETE http://localhost:3000/projects/12345
```

## Testing

Start the API server in one terminal, then use another terminal to run the `curl` examples above.

If you have added the automated test suite as `test.js`, run it with:

```bash
node --test test.js
```

## Data Storage

Project data is stored in a local JSON file rather than a database. This keeps the project simple and useful for learning REST APIs, file operations, and backend fundamentals.

**Note:** JSON-file storage is suitable for learning and small demonstrations, but it is not ideal for concurrent writes or production workloads.

## Project Structure

```text
ProjectTrackerAPI/
├── src/
│   └── server.js
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

The exact files may vary as the project evolves. Keep the JSON data file in the location expected by the server code.

## Future Improvements

- Add and enforce Zod request validation.
- Improve centralized error handling.
- Add automated tests to the npm test script.
- Replace JSON-file storage with PostgreSQL or MongoDB.
- Add environment-based configuration.
- Improve Docker image configuration and persistence.
- Add API documentation with Swagger/OpenAPI.

## Learning Objectives

This project demonstrates practical backend development concepts:

- Express routing and HTTP methods
- REST API design
- Request and response handling
- CRUD operations
- Asynchronous file-system operations
- HTTP status codes and error handling
- Basic API testing
- Containerization with Docker

## Author

**Satish Kumar Peddi**

GitHub: [@satishkumarpeddi](https://github.com/satishkumarpeddi)

Repository: [ProjectTrackerAPI](https://github.com/satishkumarpeddi/ProjectTrackerAPI)

---

Built as a hands-on project to strengthen Node.js and backend engineering fundamentals.
