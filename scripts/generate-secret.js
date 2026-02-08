// Run: node scripts/generate-secret.js
// Copy the output and use as NEXTAUTH_SECRET in Netlify.
const crypto = require("crypto");
console.log(crypto.randomBytes(32).toString("base64"));
