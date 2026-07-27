export const typescript: string[] = [
  "interface User {\n    id: string;\n    name: string;\n    email: string;\n    role: 'admin' | 'user';\n    createdAt: Date;\n}",
  "function identity<T>(arg: T): T {\n    return arg;\n}",
  "type PartialUser = Partial<User>;\ntype ReadonlyUser = Readonly<User>;\ntype UserName = Pick<User, 'name'>;\ntype WithoutEmail = Omit<User, 'email'>;",
  "function isAdmin(user: User): user is User & { role: 'admin' } {\n    return user.role === 'admin';\n}",
  "enum HttpStatus {\n    OK = 200,\n    CREATED = 201,\n    BAD_REQUEST = 400,\n    UNAUTHORIZED = 401,\n    NOT_FOUND = 404,\n    INTERNAL_ERROR = 500,\n}",
];
