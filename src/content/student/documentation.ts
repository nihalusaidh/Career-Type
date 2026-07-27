export const documentation: string[] = [
  "The system follows a microservices architecture with React frontend, Node.js backend, and MongoDB database.",
  "To set up the project locally: clone the repo, run npm install, create a .env file, and run npm run dev.",
  "POST /api/users creates a new user. Body: { name: string, email: string, password: string }.",
  "Deployment is handled via Docker containers orchestrated by Kubernetes on AWS EKS.",
  "Run npm test to execute unit tests. Run npm run test:e2e for end-to-end tests using Cypress.",
  "Proposal: Migrate legacy monolith to event-driven microservices to improve scalability and deployment velocity.",
  "Tech Spec: The authentication module uses JWT tokens with a 15-minute access and 7-day refresh token policy.",
  "User Manual: Click the Profile icon in the top-right corner to access account settings and preferences.",
  "GET /api/v2/products?page=1&limit=50 returns a paginated list of active products with inventory counts.",
  "Test Plan: Verify that user registration, login, password reset, and logout flows all function correctly across browsers.",
  "Deployment Guide: Run deploy.sh staging to deploy to staging. For production, use the CI/CD pipeline with manual approval.",
  "Architecture Overview: The system consists of a React SPA, an API gateway, four microservices, and a shared PostgreSQL cluster.",
  "Requirements: The system must support 10,000 concurrent users with 99.9% uptime and sub-200ms response times.",
  "Release v2.4.0: Added dark mode, fixed CSV export encoding issue, and improved search autocomplete performance.",
  "Design Doc: The new checkout flow uses a three-step wizard with address validation before payment processing."
];
