export const docs: string[] = [
  "## Authentication\n\nAll API requests require a valid JWT token in the Authorization header. Tokens expire after 24 hours.\n\n### Obtaining a Token\n```\nPOST /api/v1/auth/login\n```",
  "The `parseConfig` function reads a configuration file and merges it with defaults.\nIt supports YAML and JSON formats. Returns a frozen config object.\n\n```typescript\nparseConfig(path: string, opts?: ParseOptions): Config\n```",
  "## Architecture Overview\n\nThe system follows a microservices architecture with three core services:\n- **API Gateway**: Routes requests, handles auth\n- **User Service**: Manages accounts and profiles\n- **Order Service**: Processes purchases and inventory",
  "### Rate Limiting\n\n| Tier     | Requests/min | Burst |\n|----------|-------------|-------|\n| Free     | 60          | 10    |\n| Pro      | 1000        | 100   |\n| Enterprise| Unlimited  | N/A   |\n\nExceeding the limit returns HTTP 429 Too Many Requests.",
  "To run the test suite:\n```bash\nnpm run test           # unit tests\nnpm run test:e2e       # end-to-end tests\nnpm run test:coverage  # with coverage report\n```\n\nTests use Vitest with React Testing Library.",
];
