export const docker: string[] = [
  "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"dist/server.js\"]",
  "version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - NODE_ENV=production",
  "docker build -t my-app:latest . && docker run -d -p 8080:80 --name my-app my-app:latest",
  "docker volume create app-data && docker run -v app-data:/data --name db -e POSTGRES_PASSWORD=secret -d postgres:16",
  "docker network create app-net && docker run --network app-net --name api my-api && docker run --network app-net --name web my-web",
];
