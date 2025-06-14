# API Documentation

## Base URL
```
http://localhost:8080/api
```

---

## Endpoints

### 1. `POST /api/match`
- **Description:** Match a user to a coffee type based on quiz preferences.
- **Request Body:**
  ```json
  {
    "preferences": {
      "strength": "mild" | "medium" | "strong",
      "flavor": "nutty" | "chocolatey" | "fruity" | ...,
      "milk": boolean,
      "sweet": boolean
    }
  }
  ```
- **Response:**
  ```json
  {
    "match": {
      "id": "string",
      "name": "string",
      "description": "string",
      "image": "string"
    }
  }
  ```
- **Example:**
  ```bash
  curl -X POST http://localhost:8080/api/match \
    -H "Content-Type: application/json" \
    -d '{"preferences": {"strength": "medium", "flavor": "nutty", "milk": true, "sweet": false}}'
  ```

---

### 2. `GET /api/coffees`
- **Description:** Get a list of all available coffee types.
- **Response:**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "image": "string"
    },
    ...
  ]
  ```
- **Example:**
  ```bash
  curl http://localhost:8080/api/coffees
  ```

---

## Error Handling
- All endpoints return standard HTTP status codes.
- Error responses:
  ```json
  {
    "error": "Error message"
  }
  ```

## Notes
- All endpoints require `Content-Type: application/json` for POST requests.
- No authentication is required for these endpoints. 