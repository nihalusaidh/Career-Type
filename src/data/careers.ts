import { Career } from "@/types";

export const careers: Career[] = [
  {
    id: "developer",
    name: "Developer",
    icon: "code",
    description: "Practice typing with real code snippets, error logs, Git commands, and more.",
    subCategories: [
      { id: "python", name: "Python", description: "Python code snippets", passages: [] },
      { id: "cpp", name: "C++", description: "C++ code snippets", passages: [] },
      { id: "java", name: "Java", description: "Java code snippets", passages: [] },
      { id: "javascript", name: "JavaScript", description: "JavaScript code snippets", passages: [] },
      { id: "typescript", name: "TypeScript", description: "TypeScript code snippets", passages: [] },
      { id: "react", name: "React", description: "React component code", passages: [] },
      { id: "html", name: "HTML", description: "HTML markup", passages: [] },
      { id: "css", name: "CSS", description: "CSS and styles", passages: [] },
      { id: "sql", name: "SQL", description: "SQL queries", passages: [] },
      { id: "mongodb", name: "MongoDB", description: "MongoDB queries", passages: [] },
      { id: "json", name: "JSON", description: "JSON data structures", passages: [] },
      { id: "xml", name: "XML", description: "XML documents", passages: [] },
      { id: "git", name: "Git Commands", description: "Git command line operations", passages: [] },
      { id: "linux", name: "Linux Commands", description: "Linux terminal commands", passages: [] },
      { id: "docker", name: "Docker", description: "Docker commands and configs", passages: [] },
      { id: "api", name: "API Requests", description: "REST API request/response", passages: [] },
      { id: "regex", name: "Regex", description: "Regular expressions", passages: [] },
      { id: "markdown", name: "Markdown", description: "Markdown documents", passages: [] },
      { id: "terminal", name: "Terminal Commands", description: "Shell commands", passages: [] },
      { id: "errors", name: "Error Logs", description: "Stack traces and error logs", passages: [] },
      { id: "stacktraces", name: "Stack Traces", description: "Exception stack traces", passages: [] },
      { id: "config", name: "Configuration Files", description: "Config file contents", passages: [] },
      { id: "comments", name: "Code Comments", description: "Code documentation comments", passages: [] },
      { id: "docs", name: "Documentation", description: "API and code documentation", passages: [] },
    ],
  },
  {
    id: "office",
    name: "Office",
    icon: "briefcase",
    description: "Practice typing emails, reports, meeting notes, and business documents.",
    subCategories: [
      { id: "emails", name: "Emails", description: "Professional emails", passages: [] },
      { id: "meeting-notes", name: "Meeting Notes", description: "Meeting notes and minutes", passages: [] },
      { id: "reports", name: "Business Reports", description: "Business report excerpts", passages: [] },
      { id: "letters", name: "Letters", description: "Professional letters", passages: [] },
      { id: "invoices", name: "Invoices", description: "Invoice descriptions", passages: [] },
      { id: "presentations", name: "Presentations", description: "Presentation scripts", passages: [] },
      { id: "policies", name: "Policies", description: "Company policies", passages: [] },
      { id: "announcements", name: "Announcements", description: "Company announcements", passages: [] },
      { id: "spreadsheets", name: "Spreadsheets", description: "Spreadsheet data", passages: [] },
      { id: "communication", name: "Business Communication", description: "Business correspondence", passages: [] },
    ],
  },
  {
    id: "customer-support",
    name: "Customer Support",
    icon: "headset",
    description: "Practice typing live chat responses, support tickets, and customer emails.",
    subCategories: [
      { id: "live-chat", name: "Live Chat", description: "Live chat conversations", passages: [] },
      { id: "refund-replies", name: "Refund Replies", description: "Refund response templates", passages: [] },
      { id: "shipping", name: "Shipping Responses", description: "Shipping and tracking replies", passages: [] },
      { id: "complaints", name: "Complaint Handling", description: "Customer complaint responses", passages: [] },
      { id: "tech-support", name: "Technical Support", description: "Technical support responses", passages: [] },
      { id: "customer-emails", name: "Customer Emails", description: "Professional customer emails", passages: [] },
      { id: "tickets", name: "Support Tickets", description: "Support ticket responses", passages: [] },
    ],
  },
  {
    id: "hr",
    name: "HR",
    icon: "users",
    description: "Practice typing offer letters, reviews, policies, and HR correspondence.",
    subCategories: [
      { id: "offer-letters", name: "Offer Letters", description: "Job offer letter templates", passages: [] },
      { id: "interview-emails", name: "Interview Emails", description: "Interview invitation emails", passages: [] },
      { id: "rejection-emails", name: "Rejection Emails", description: "Candidate rejection emails", passages: [] },
      { id: "announcements", name: "Employee Announcements", description: "Internal announcements", passages: [] },
      { id: "policies", name: "Internal Policies", description: "Company policy documents", passages: [] },
      { id: "joining", name: "Joining Instructions", description: "New hire instructions", passages: [] },
      { id: "reviews", name: "Performance Reviews", description: "Performance review text", passages: [] },
    ],
  },
  {
    id: "data-entry",
    name: "Data Entry",
    icon: "clipboard",
    description: "Practice typing numbers, addresses, codes, and structured data.",
    subCategories: [
      { id: "phone-numbers", name: "Phone Numbers", description: "Phone number lists", passages: [] },
      { id: "addresses", name: "Addresses", description: "Full address entries", passages: [] },
      { id: "invoice-numbers", name: "Invoice Numbers", description: "Invoice ID sequences", passages: [] },
      { id: "gst-numbers", name: "GST Numbers", description: "GST identification numbers", passages: [] },
      { id: "tracking-ids", name: "Tracking IDs", description: "Shipment tracking codes", passages: [] },
      { id: "bank-details", name: "Bank Details", description: "Bank account information", passages: [] },
      { id: "serial-numbers", name: "Serial Numbers", description: "Product serial codes", passages: [] },
      { id: "dates", name: "Dates", description: "Date entries in various formats", passages: [] },
      { id: "product-codes", name: "Product Codes", description: "Product SKU and codes", passages: [] },
      { id: "order-ids", name: "Order IDs", description: "Order reference numbers", passages: [] },
    ],
  },
  {
    id: "student",
    name: "Student",
    icon: "graduation-cap",
    description: "Practice typing essays, research papers, notes, and academic content.",
    subCategories: [
      { id: "assignments", name: "Assignments", description: "Academic assignment content", passages: [] },
      { id: "notes", name: "Notes", description: "Lecture and study notes", passages: [] },
      { id: "research", name: "Research Papers", description: "Research paper excerpts", passages: [] },
      { id: "programming", name: "Programming Exercises", description: "Coding exercise descriptions", passages: [] },
      { id: "essays", name: "Essays", description: "Essay paragraphs", passages: [] },
      { id: "lab-reports", name: "Lab Reports", description: "Laboratory report sections", passages: [] },
      { id: "documentation", name: "Project Documentation", description: "Project documentation", passages: [] },
    ],
  },
];

export function getCareer(id: string): Career | undefined {
  return careers.find((c) => c.id === id);
}

export function getSubCategory(careerId: string, subId: string) {
  const career = getCareer(careerId);
  if (!career) return undefined;
  return career.subCategories.find((s) => s.id === subId);
}
