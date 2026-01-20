const fs = require('fs');
const content = `DATABASE_URL="postgresql://postgres:benjeanne@localhost:5432/my_sculpt_tech?schema=public"
NEXTAUTH_SECRET="super-secret-key-change-me-in-production"
NEXTAUTH_URL="http://localhost:3000"
`;
fs.writeFileSync('.env', content, 'utf8');
console.log('.env file written successfully');
