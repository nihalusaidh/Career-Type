export const api: string[] = [
  "POST /api/v1/users\nContent-Type: application/json\nAuthorization: Bearer <token>\n\n{\"name\": \"Alice\", \"email\": \"alice@example.com\"}",
  "HTTP/1.1 201 Created\nLocation: /api/v1/users/42\nContent-Type: application/json\n\n{\"id\": 42, \"name\": \"Alice\"}",
  "GET /api/v1/products?page=1&limit=20&sort=price:asc\nAccept: application/json\nIf-None-Match: \"abc123\"",
  "HTTP/1.1 422 Unprocessable Entity\n{\"error\": \"Validation failed\", \"details\": [{\"field\": \"email\", \"message\": \"Invalid email format\"}]}",
  "DELETE /api/v1/users/42\nIf-Match: \"etag-xyz\"\n\nHTTP/1.1 204 No Content",
];
