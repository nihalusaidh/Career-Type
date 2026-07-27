export const sql: string[] = [
  "SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nWHERE o.status = 'completed'\nORDER BY o.total DESC;",
  "SELECT department, AVG(salary) as avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 80000;",
  "WITH ranked AS (\n    SELECT *, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rn\n    FROM employees\n)\nSELECT * FROM ranked WHERE rn <= 3;",
  "SELECT * FROM products\nWHERE category_id IN (\n    SELECT id FROM categories WHERE active = 1\n);",
  "SELECT\nto_char(created_at, 'YYYY-MM') AS month,\nCOUNT(*) AS total,\nSUM(amount) AS revenue\nFROM transactions\nGROUP BY month\nORDER BY month;",
];
