
# Task Management System API Documentation

A microservices-based task management system with user management, task handling, and notifications.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Services](#services)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Error Responses](#error-responses)
- [Message Queue](#message-queue)
- [Docker Configuration](#docker-configuration)
- [Environment Variables](#environment-variables)

## Architecture Overview

The system consists of three microservices:
- User Service (Port: 3000)
- Task Service (Port: 3001)
- Notification Service (Port: 3002)

Supporting Infrastructure:
- MongoDB (Port: 27017)
- RabbitMQ (Ports: 5672, 15672)

## Services

### 1. User Service
Handles user management operations.

### 2. Task Service
Manages task operations and publishes task creation events.

### 3. Notification Service
Processes task notifications via RabbitMQ.

## Setup Instructions

1. Clone the repository
2. Navigate to the Backend directory
3. Run Docker Compose:
```bash
docker-compose up
```

## API Endpoints

### User Service (`http://localhost:3000`)

#### Create User
```
POST /user/save
```
Request Body:
```json
{
    "name": "string",
    "email": "string"
}
```
Response (201):
```json
{
    "name": "string",
    "email": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "_id": "string"
}
```

#### Get All Users
```
GET /user/getAll
```
Response (200):
```json
[
    {
        "_id": "string",
        "name": "string",
        "email": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
]
```

### Task Service (`http://localhost:3001`)

#### Create Task
```
POST /tasks/create
```
Request Body:
```json
{
    "title": "string",
    "description": "string",
    "userId": "string"
}
```
Response (201):
```json
{
    "_id": "string",
    "title": "string",
    "description": "string",
    "userId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

#### Get All Tasks
```
GET /tasks/getall
```
Response (200):
```json
[
    {
        "_id": "string",
        "title": "string",
        "description": "string",
        "userId": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
]
```

## Data Models

### User Schema
```javascript
{
    name: String,
    email: String,
    timestamps: true
}
```

### Task Schema
```javascript
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamps: true
}
```

## Error Responses

All endpoints may return the following error responses:

```json
{
    "message": "error message"
}
```

Status Codes:
- 200: Success
- 201: Created
- 500: Server Error
- 503: Service Unavailable (RabbitMQ connection issues)

## Message Queue

The system uses RabbitMQ for asynchronous communication:
- Queue Name: `task_queue`
- Message Format:
```json
{
    "taskId": "string",
    "userId": "string",
    "title": "string"
}
```

## Docker Configuration

Services are containerized using Docker. The configuration can be found in the `docker-compose.yml` file.

## Environment Variables

Each service requires the following environment variables:

### User Service
```
MONGO_URI=mongodb://mongo:27017/users
PORT=3000
```

### Task Service
```
MONGO_URI=mongodb://mongo:27017/tasks
PORT=3001
```

### Notification Service
```
RABBITMQ_URL=amqp://rabbitmq_container
PORT=3002
```
