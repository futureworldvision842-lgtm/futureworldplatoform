const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const dirs = [
  path.join(root, ".next"),
  path.join(root, "node_modules", ".cache"),
];
for (const dir of dirs) {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true });
      console.log("Deleted", path.relative(root, dir) || ".next");
    } catch (e) {
      console.warn("Could not delete", dir, e.message);
    }
  }
}
