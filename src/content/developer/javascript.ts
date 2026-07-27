export const javascript: string[] = [
  "async function fetchData(url) {\n    try {\n        const response = await fetch(url);\n        if (!response.ok) throw new Error(`HTTP ${response.status}`);\n        return await response.json();\n    } catch (err) {\n        console.error('Fetch failed:', err);\n    }\n}",
  "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);",
  "function createCounter() {\n    let count = 0;\n    return function() {\n        count++;\n        return count;\n    };\n}",
  "document.querySelectorAll('.accordion-item').forEach(item => {\n    item.addEventListener('click', () => {\n        item.classList.toggle('active');\n        const panel = item.querySelector('.panel');\n        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';\n    });\n});",
  "new Promise((resolve, reject) => {\n    setTimeout(() => resolve('Done'), 1000);\n}).then(result => console.log(result)).catch(err => console.error(err));",
];
