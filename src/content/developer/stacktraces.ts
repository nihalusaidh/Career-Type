export const stacktraces: string[] = [
  "java.lang.NullPointerException\n    at com.app.service.UserService.getProfile(UserService.java:45)\n    at com.app.controller.UserController.showProfile(UserController.java:23)",
  "Traceback (most recent call last):\n  File \"app.py\", line 15, in <module>\n    result = divide(5, 0)\n  File \"app.py\", line 8, in divide\n    return a / b\nZeroDivisionError: division by zero",
  "TypeError: Cannot read properties of undefined (reading 'map')\n    at TodoList.render (components/TodoList.tsx:25:18)\n    at finishClassComponent (react-dom.development.js:12345:12)",
  "Unhandled rejection: SequelizeConnectionError: connect ECONNREFUSED 127.0.0.1:5432\n    at Client._connection (node_modules/pg/lib/client.js:124:15)",
  "System.NullReferenceException: Object reference not set to an instance of an object.\n   at MyApp.Services.OrderService.CalculateTotal(Int32 orderId) in OrderService.cs:56",
];
