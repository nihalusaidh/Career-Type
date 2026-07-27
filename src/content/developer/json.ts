export const json: string[] = [
  '{\n  "user": {\n    "id": 42,\n    "name": "Alice Smith",\n    "email": "alice@example.com",\n    "roles": ["admin", "editor"]\n  }\n}',
  '{\n  "status": "ok",\n  "data": {\n    "items": [\n      {"id": 1, "title": "First Item"},\n      {"id": 2, "title": "Second Item"}\n    ],\n    "total": 2,\n    "page": 1\n  }\n}',
  '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "commonjs",\n    "strict": true,\n    "outDir": "./dist"\n  },\n  "include": ["src/**/*"]\n}',
  '[\n  {"name": "server1", "ip": "10.0.1.1", "region": "us-east"},\n  {"name": "server2", "ip": "10.0.1.2", "region": "us-west"}\n]',
  '{\n  "endpoint": "https://api.example.com/v2",\n  "timeout": 5000,\n  "retry": {\n    "count": 3,\n    "backoff": "exponential"\n  }\n}',
];
