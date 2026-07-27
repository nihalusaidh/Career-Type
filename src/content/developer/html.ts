export const html: string[] = [
  "<form action=\"/submit\" method=\"POST\">\n    <label for=\"email\">Email:</label>\n    <input type=\"email\" id=\"email\" name=\"email\" required aria-describedby=\"email-help\">\n    <span id=\"email-help\">We\\'ll never share your email.</span>\n    <button type=\"submit\">Submit</button>\n</form>",
  "<table>\n    <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>\n    <tbody>\n        <tr><td>Alice</td><td>Admin</td><td>Active</td></tr>\n        <tr><td>Bob</td><td>User</td><td>Inactive</td></tr>\n    </tbody>\n</table>",
  "<header role=\"banner\">\n    <nav aria-label=\"Main navigation\">\n        <ul>\n            <li><a href=\"/\" aria-current=\"page\">Home</a></li>\n            <li><a href=\"/about\">About</a></li>\n            <li><a href=\"/contact\">Contact</a></li>\n        </ul>\n    </nav>\n</header>",
  "<article>\n    <h1>Understanding Semantic HTML</h1>\n    <p>Semantic elements like <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;aside&gt;</code> improve accessibility.</p>\n    <time datetime=\"2024-03-15\">March 15, 2024</time>\n</article>",
  "<div class=\"card\" role=\"region\" aria-labelledby=\"card-title\">\n    <h2 id=\"card-title\">Product Name</h2>\n    <p>Description of the product goes here.</p>\n    <button aria-label=\"Add to cart\">Buy Now</button>\n</div>",
];
