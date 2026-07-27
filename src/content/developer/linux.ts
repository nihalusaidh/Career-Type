export const linux: string[] = [
  "grep -rn \"FIXME\" --include=\"*.py\" --exclude-dir=node_modules . | head -20",
  "find /var/log -name \"*.log\" -mtime -7 -exec grep -l \"ERROR\" {} \\;",
  "ps aux --sort=-%mem | head -5 && kill -9 $(lsof -ti:3000)",
  "ssh -i ~/.ssh/deploy_key -J jumpbox.example.com deploy@app-server -- \"sudo systemctl restart nginx\"",
  "cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10",
];
