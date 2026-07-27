export const python: string[] = [
  "def fibonacci(n: int) -> int:\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)",
  "async def fetch_user_data(user_id: str) -> dict:\n    async with aiohttp.ClientSession() as session:\n        async with session.get(f'/api/users/{user_id}') as resp:\n            return await resp.json()",
  "def validate_email(email: str) -> bool:\n    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'\n    return bool(re.match(pattern, email))",
  "with open('config.json', 'r') as f:\n    config = json.load(f)\n    database_url = config.get('database', {}).get('url')\n    if not database_url:\n        raise ValueError('Database URL not configured')",
  "@dataclass\nclass User:\n    id: str\n    name: str\n    email: str\n    created_at: datetime\n\n    def to_dict(self) -> dict:\n        return {'id': self.id, 'name': self.name, 'email': self.email}",
];
