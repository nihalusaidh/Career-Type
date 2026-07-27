export const terminal: string[] = [
  "npm create vite@latest my-app -- --template react-ts && cd my-app && npm install",
  "pip install -r requirements.txt && python manage.py migrate && python manage.py createsuperuser",
  "cargo build --release && cargo test -- --nocapture && cargo clippy -- -D warnings",
  "make clean && make -j$(nproc) && make install PREFIX=/usr/local",
  "npx tsc --noEmit --watch & npx nodemon --watch dist dist/server.js",
];
