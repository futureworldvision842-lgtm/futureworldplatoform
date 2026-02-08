const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const root = __dirname;
const repo = "https://github.com/futureworldvision842-lgtm/futureworldplatoform.git";

function run(cmd, hide = false) {
  try {
    return execSync(cmd, { cwd: root, stdio: hide ? "pipe" : "inherit", encoding: "utf8" });
  } catch (e) {
    if (hide) return null;
    throw e;
  }
}

console.log("Setting Git user (for commit)...");
run("git config user.email \"muhammadqureshi865@gmail.com\"", true);
run("git config user.name \"Muhammad Qureshi\"", true);

if (!fs.existsSync(path.join(root, ".git"))) {
  console.log("Initializing repo...");
  run("git init");
  run("git branch -M main");
}

console.log("Adding files & committing...");
run("git add .");
try {
  run("git commit -m \"Deploy: GAIGS Global AI Governance platform - full project\"");
} catch (_) {
  console.log("(Nothing new to commit)");
}
run("git remote remove origin", true);
run("git remote add origin " + repo);
console.log("Pushing to GitHub...");
try {
  run("git push -u origin main");
} catch (_) {
  console.log("Trying pull then push (repo already has content)...");
  run("git pull origin main --allow-unrelated-histories --no-edit", true);
  run("git push -u origin main");
}
console.log("\nDone: https://github.com/futureworldvision842-lgtm/futureworldplatoform");
