export const git: string[] = [
  "git checkout -b feature/login-page && git commit -m \"Add login page component\" && git push -u origin feature/login-page",
  "git rebase -i HEAD~5 && git log --oneline --graph --all --decorate",
  "git cherry-pick a1b2c3d && git diff --cached --stat",
  "git stash push -m \"WIP: auth refactor\" && git stash list && git stash pop stash@{0}",
  "git log --since=\"2024-01-01\" --author=\"alice\" --format=\"%h %s\" --no-merges",
];
