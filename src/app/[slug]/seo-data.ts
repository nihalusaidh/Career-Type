export interface SEOPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  content: string;
  careerName: string;
  ctaLink: string;
  relatedLinks: { label: string; href: string }[];
}

export const seoPages: SEOPage[] = [
  {
    slug: "python-typing-practice",
    title: "Python Typing Practice",
    h1: "Python Typing Practice – Improve Your Coding Speed",
    description:
      "Practice typing Python code with real syntax including functions, decorators, list comprehensions, and async patterns. Free, no login required.",
    content:
      "Python is one of the most popular programming languages in the world. Whether you're writing data pipelines, building web applications with Django or FastAPI, or automating tasks, typing Python code efficiently is a critical skill.\n\nUnlike general typing practice, Python typing requires familiarity with indentation-based blocks, special characters like colons and underscores, and common patterns like list comprehensions and lambda functions. Our Python typing practice mode uses real code snippets from actual projects, not random words.\n\nPractice typing:\n- Function and class definitions with decorators\n- List and dictionary comprehensions\n- Async/await patterns\n- Error handling with try/except blocks\n- Type hints and dataclasses\n\nStart practicing now and improve your Python typing speed.",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "JavaScript Typing", href: "/javascript-typing-practice" },
      { label: "SQL Typing Practice", href: "/sql-typing-practice" },
      { label: "TypeScript Typing", href: "/typescript-typing-practice" },
      { label: "Git Command Practice", href: "/git-command-practice" },
    ],
  },
  {
    slug: "sql-typing-practice",
    title: "SQL Typing Practice",
    h1: "SQL Typing Practice – Master Database Queries Faster",
    description:
      "Improve your SQL typing speed with real queries including JOINs, subqueries, window functions, and CTEs. Free typing practice for developers and data analysts.",
    content:
      "SQL is the universal language of data. Writing SQL queries quickly and accurately is essential for developers, data analysts, and database administrators. Our SQL typing practice mode helps you type real SQL syntax faster.\n\nPractice with:\n- SELECT statements with multiple JOINs\n- Subqueries and Common Table Expressions (CTEs)\n- Window functions (ROW_NUMBER, RANK, LAG/LEAD)\n- GROUP BY and HAVING clauses\n- CREATE TABLE and INSERT statements\n- Index and query optimization patterns\n\nBy practicing with real SQL queries, you'll build muscle memory for common patterns, reduce syntax errors, and write queries faster.",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "Python Typing", href: "/python-typing-practice" },
      { label: "MongoDB Typing", href: "/mongodb-typing-practice" },
      { label: "JavaScript Typing", href: "/javascript-typing-practice" },
      { label: "Data Entry Practice", href: "/data-entry-practice" },
    ],
  },
  {
    slug: "git-command-practice",
    title: "Git Command Practice",
    h1: "Git Command Practice – Type Git Commands Faster",
    description:
      "Practice typing Git commands including commit, branch, rebase, cherry-pick, and log operations. Improve your terminal typing speed.",
    content:
      "Git is essential for modern software development. Knowing Git commands is one thing, but typing them quickly and correctly is another. Our Git command practice helps you build muscle memory for the most common Git operations.\n\nPractice typing:\n- Branch management: git branch, git checkout, git switch\n- Commit operations: git commit, git amend, git rebase -i\n- Remote operations: git push, git pull, git fetch\n- Inspection: git log, git diff, git blame, git status\n- Advanced: git cherry-pick, git stash, git bisect\n\nMaster the Git command line and boost your productivity.",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "Linux Command Practice", href: "/linux-command-practice" },
      { label: "Terminal Practice", href: "/terminal-typing-practice" },
      { label: "Docker Practice", href: "/docker-typing-practice" },
    ],
  },
  {
    slug: "javascript-typing-practice",
    title: "JavaScript Typing Practice",
    h1: "JavaScript Typing Practice – Type JS Code Faster",
    description:
      "Practice typing JavaScript including async/await, closures, array methods, and DOM manipulation. Free typing practice for frontend developers.",
    content:
      "JavaScript powers the modern web. From React frontends to Node.js backends, typing JavaScript efficiently is a must-have skill. Our JavaScript typing practice uses real code patterns.\n\nPractice with:\n- Arrow functions and closures\n- Async/await and Promise chains\n- Array methods: map, filter, reduce, find\n- Destructuring and spread operators\n- DOM manipulation patterns\n- Modern ES6+ syntax",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "TypeScript Practice", href: "/typescript-typing-practice" },
      { label: "React Practice", href: "/react-typing-practice" },
      { label: "HTML/CSS Typing", href: "/html-css-typing" },
      { label: "Node.js Typing", href: "/node-typing-practice" },
    ],
  },
  {
    slug: "typescript-typing-practice",
    title: "TypeScript Typing Practice",
    h1: "TypeScript Typing Practice – Write Typed Code Faster",
    description:
      "Practice typing TypeScript code with interfaces, generics, utility types, and type guards. Improve your typed coding speed.",
    content:
      "TypeScript adds static typing to JavaScript, making code more robust and maintainable. Our TypeScript typing practice helps you type complex type annotations and generic patterns quickly.\n\nPractice with:\n- Interface and type definitions\n- Generic functions and constraints\n- Utility types: Partial, Pick, Omit, Record\n- Type guards and narrowing\n- Enum and tuple patterns\n- Advanced mapped types\n\nMaster TypeScript typing speed and write better typed code.",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "JavaScript Practice", href: "/javascript-typing-practice" },
      { label: "React Practice", href: "/react-typing-practice" },
      { label: "Python Practice", href: "/python-typing-practice" },
    ],
  },
  {
    slug: "html-css-typing",
    title: "HTML & CSS Typing Practice",
    h1: "HTML and CSS Typing Practice – Build Layouts Faster",
    description:
      "Practice typing HTML markup and CSS styles including Flexbox, Grid, animations, and responsive design patterns.",
    content:
      "HTML and CSS are the foundation of web development. Typing semantic HTML and modern CSS quickly is essential for frontend developers. Our HTML & CSS typing mode helps you build layouts faster.\n\nPractice with:\n- Semantic HTML5 elements\n- Forms with validation attributes\n- CSS Flexbox and Grid layouts\n- CSS animations and transitions\n- Media queries and responsive patterns\n- Custom properties and calc()",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "JavaScript Practice", href: "/javascript-typing-practice" },
      { label: "React Practice", href: "/react-typing-practice" },
      { label: "CSS Typing", href: "/css-typing-practice" },
    ],
  },
  {
    slug: "linux-command-practice",
    title: "Linux Command Practice",
    h1: "Linux Command Practice – Master the Terminal",
    description:
      "Practice typing Linux commands including grep, sed, awk, find, process management, and file operations.",
    content:
      "The Linux command line is powerful. Typing commands quickly and accurately can dramatically improve your productivity as a developer or system administrator.\n\nPractice with:\n- File operations: ls, cp, mv, rm, chmod, chown\n- Text processing: grep, sed, awk, cut, sort, uniq\n- Process management: ps, kill, top, htop, systemctl\n- Networking: ssh, scp, curl, wget, netstat\n- Permissions and ownership\n- Pipes and redirections",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "Git Command Practice", href: "/git-command-practice" },
      { label: "Terminal Practice", href: "/terminal-typing-practice" },
      { label: "Docker Practice", href: "/docker-typing-practice" },
    ],
  },
  {
    slug: "docker-typing-practice",
    title: "Docker Typing Practice",
    h1: "Docker Typing Practice – Container Commands",
    description:
      "Practice typing Docker commands and Dockerfile configurations. Improve your container workflow typing speed.",
    content:
      "Docker is essential for modern DevOps and development. Typing Docker commands efficiently saves time and reduces errors in your container workflow.\n\nPractice with:\n- Dockerfile instructions: FROM, RUN, COPY, ENTRYPOINT\n- Build commands: docker build, docker tag, docker push\n- Run commands: docker run, docker exec, docker logs\n- Docker Compose YAML configuration\n- Volume and network management\n- Container lifecycle: start, stop, rm, prune",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "Linux Practice", href: "/linux-command-practice" },
      { label: "Terminal Practice", href: "/terminal-typing-practice" },
      { label: "Git Practice", href: "/git-command-practice" },
    ],
  },
  {
    slug: "customer-support-typing",
    title: "Customer Support Typing Practice",
    h1: "Customer Support Typing – Respond Faster",
    description:
      "Practice typing customer support responses including live chat, refund replies, complaint handling, and technical support tickets.",
    content:
      "Customer support professionals type responses all day. Improving your typing speed with realistic customer scenarios helps you respond faster and serve more customers.\n\nPractice with:\n- Live chat greeting and troubleshooting\n- Refund and return processing\n- Complaint de-escalation responses\n- Technical support issue resolution\n- Professional email correspondence\n- Support ticket categorization\n\nOur customer support mode uses real scenarios from actual support teams.",
    careerName: "Customer Support",
    ctaLink: "/typing/customer-support",
    relatedLinks: [
      { label: "Office Typing", href: "/office-typing-practice" },
      { label: "Data Entry Practice", href: "/data-entry-practice" },
      { label: "Email Typing Practice", href: "/email-typing-practice" },
    ],
  },
  {
    slug: "hr-email-typing",
    title: "HR Email Typing Practice",
    h1: "HR Email Typing Practice – Write Professional HR Correspondence",
    description:
      "Practice typing offer letters, interview emails, performance reviews, and HR policies. Improve your HR typing speed.",
    content:
      "HR professionals write emails, letters, and documents all day. From offer letters to performance reviews, typing quickly and accurately is a valuable skill.\n\nPractice with:\n- Offer letters with salary and benefits details\n- Interview invitation and scheduling emails\n- Candidate rejection correspondence\n- Performance review write-ups\n- Company policy documents\n- Joining instructions for new hires\n\nImprove your HR typing speed with realistic content.",
    careerName: "HR",
    ctaLink: "/typing/hr",
    relatedLinks: [
      { label: "Office Typing", href: "/office-typing-practice" },
      { label: "Customer Support Typing", href: "/customer-support-typing" },
      { label: "Email Practice", href: "/email-typing-practice" },
    ],
  },
  {
    slug: "data-entry-practice",
    title: "Data Entry Typing Practice",
    h1: "Data Entry Typing – Type Numbers and Codes Faster",
    description:
      "Practice typing phone numbers, addresses, invoice numbers, GST numbers, tracking IDs, and product codes. Improve data entry speed.",
    content:
      "Data entry requires typing numbers, codes, and structured data accurately. Our data entry practice mode helps you improve speed with realistic data formats.\n\nPractice with:\n- Phone numbers in various formats\n- Full street addresses\n- Invoice and order reference numbers\n- GST/VAT identification numbers\n- Shipping tracking IDs (UPS, FedEx, USPS)\n- Bank account and routing numbers\n- Product SKU and serial numbers\n\nImprove your alphanumeric typing speed with real data entry scenarios.",
    careerName: "Data Entry",
    ctaLink: "/typing/data-entry",
    relatedLinks: [
      { label: "Office Typing", href: "/office-typing-practice" },
      { label: "Customer Support", href: "/customer-support-typing" },
      { label: "Student Typing", href: "/student-typing-practice" },
    ],
  },
  {
    slug: "student-typing-practice",
    title: "Student Typing Practice",
    h1: "Student Typing Practice – Type Essays and Notes Faster",
    description:
      "Practice typing essays, research papers, lecture notes, lab reports, and programming exercises. Free typing practice for students.",
    content:
      "Students type assignments, essays, and reports regularly. Improving your typing speed helps you complete work faster and have more time for learning.\n\nPractice with:\n- Essay introductions and thesis statements\n- Research paper abstracts and conclusions\n- Lecture and study notes\n- Lab report methodology sections\n- Programming exercise descriptions\n- Project documentation\n\nOur student mode uses academic content that matches real coursework.",
    careerName: "Student",
    ctaLink: "/typing/student",
    relatedLinks: [
      { label: "Developer Typing", href: "/developer-typing-practice" },
      { label: "Data Entry Practice", href: "/data-entry-practice" },
      { label: "Programming Typing", href: "/programming-typing-exercises" },
    ],
  },
  {
    slug: "developer-typing-practice",
    title: "Developer Typing Practice",
    h1: "Developer Typing Practice – Type Code Faster",
    description:
      "Practice typing Python, JavaScript, TypeScript, SQL, Git commands, and more. The best typing practice for software engineers and developers.",
    content:
      "Developers spend a significant portion of their day typing. Whether you're writing code, reviewing pull requests, or responding to code reviews, typing speed directly impacts productivity.\n\nOur developer typing mode covers 24 sub-categories with real code snippets, error logs, stack traces, and documentation. Unlike generic typing practice, you'll build muscle memory for actual programming syntax.\n\nCategories include:\n- Python, JavaScript, TypeScript, Java, C++\n- React, HTML, CSS\n- SQL, MongoDB\n- Git, Linux, Docker commands\n- API requests, Regex, Markdown\n- Error logs, stack traces, config files, code comments, documentation\n\nStart practicing now and type code faster than ever.",
    careerName: "Developer",
    ctaLink: "/typing/developer",
    relatedLinks: [
      { label: "Python Practice", href: "/python-typing-practice" },
      { label: "SQL Practice", href: "/sql-typing-practice" },
      { label: "Git Practice", href: "/git-command-practice" },
      { label: "JavaScript Practice", href: "/javascript-typing-practice" },
    ],
  },
  {
    slug: "office-typing-practice",
    title: "Office Typing Practice",
    h1: "Office Typing Practice – Type Business Documents Faster",
    description:
      "Practice typing emails, meeting notes, business reports, invoices, and presentations. Improve office typing speed for professionals.",
    content:
      "Office professionals type emails, reports, and documents throughout the day. Improving your typing speed with real business content helps you be more productive.\n\nPractice with:\n- Professional business emails\n- Meeting notes and minutes\n- Business and financial reports\n- Formal letters and proposals\n- Invoice descriptions and payment terms\n- Presentation scripts and talking points\n- Company policies and announcements\n\nOur office mode uses realistic business content from actual workplace scenarios.",
    careerName: "Office",
    ctaLink: "/typing/office",
    relatedLinks: [
      { label: "Customer Support", href: "/customer-support-typing" },
      { label: "HR Email Typing", href: "/hr-email-typing" },
      { label: "Data Entry Practice", href: "/data-entry-practice" },
    ],
  },
];

export function getSEOPage(slug: string): SEOPage | undefined {
  return seoPages.find((p) => p.slug === slug);
}
