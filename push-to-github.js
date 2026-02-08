const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const repo = "https://github.com/futureworldvision842-lgtm/futureworldplatoform.git";
const root = path.join(__dirname);

function run(cmd, opt = {}) {
  try {
    return execSync(cmd, { cwd: root, stdio: "inherit", ...opt });
  } catch (e) {
    if (e.status !== 0) throw e;
  }
}

console.log("Git: init, add, commit, remote, push...\n");

if (!fs.existsSync(path.join(root, ".git"))) {
  run("git init");
  run("git branch -M main");
}

run("git add .");

let hasCommit = false;
try {
  execSync('git commit -m "Deploy: GAIGS / Global AI Governance platform - full project"', { cwd: root, stdio: "inherit" });
  hasCommit = true;
} catch (_) {}

if (!hasCommit) {
  try {
    execSync("git rev-parse HEAD", { cwd: root, stdio: "pipe" });
    hasCommit = true; // already had commits
  } catch (_) {}
}

if (!hasCommit) {
  console.error("\nCommit failed (no commits yet). Set your Git identity first:");
  console.error('  git config user.email "your@email.com"');
  console.error('  git config user.name "Your Name"');
  console.error("\nThen run: node push-to-github.js");
  process.exit(1);
}

try {
  execSync("git remote remove origin", { cwd: root, stdio: "pipe" });
} catch (_) {}
run(`git remote add origin ${repo}`);
console.log("\nPushing to GitHub...");
try {
  run("git push -u origin main");
  console.log("\nDone. Repo: https://github.com/futureworldvision842-lgtm/futureworldplatoform");
} catch (e) {
  console.error("\nPush failed. If repo already has commits on GitHub, run:");
  console.error("  git pull origin main --allow-unrelated-histories");
  console.error("  git push -u origin main");
  process.exit(1);
}
