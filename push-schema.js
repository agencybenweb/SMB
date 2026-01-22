const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse env vars (handle BOM)
const cleanContent = envContent.replace(/^\uFEFF/, '');
const envVars = {};
cleanContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        }
    }
});

// Execute prisma db push with env vars
try {
    execSync('npx prisma db push', {
        stdio: 'inherit',
        env: { ...process.env, ...envVars }
    });
    console.log('✅ Database schema pushed successfully');
} catch (error) {
    console.error('❌ Error pushing schema:', error.message);
    process.exit(1);
}
