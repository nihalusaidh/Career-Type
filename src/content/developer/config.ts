export const config: string[] = [
  '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc && vite build",\n    "test": "vitest"\n  },\n  "dependencies": {\n    "react": "^18.2.0"\n  }\n}',
  '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "strict": true,\n    "jsx": "react-jsx",\n    "outDir": "dist"\n  },\n  "include": ["src"]\n}',
  "# App environment configuration\nDATABASE_URL=postgresql://user:pass@localhost:5432/mydb\nREDIS_URL=redis://localhost:6379\nPORT=3000\nNODE_ENV=development\nJWT_SECRET=change_me_in_production",
  "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package.json yarn.lock ./\nRUN yarn install --frozen-lockfile\nCOPY . .\nRUN yarn build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html",
  "module.exports = {\n  entry: './src/index.ts',\n  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },\n  module: { rules: [{ test: /\\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }] },\n  resolve: { extensions: ['.ts', '.tsx', '.js'] },\n  mode: 'production',\n};",
];
