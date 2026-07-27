export const css: string[] = [
  ".container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 1rem;\n    flex-wrap: wrap;\n}",
  ".grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    gap: 1.5rem;\n    padding: 2rem;\n}",
  "@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(10px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.animate {\n    animation: fadeIn 0.3s ease-out;\n}",
  "@media (max-width: 768px) {\n    .sidebar {\n        display: none;\n    }\n    .main-content {\n        grid-template-columns: 1fr;\n    }\n}",
  ":root {\n    --primary: #0070f3;\n    --secondary: #6b7280;\n    --radius: 8px;\n    --shadow: 0 2px 8px rgba(0,0,0,0.1);\n}\n\n.card {\n    border-radius: var(--radius);\n    box-shadow: var(--shadow);\n    background: var(--primary);\n}",
];
