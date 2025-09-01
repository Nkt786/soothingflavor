#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

console.log('🧪 Testing cleanup script functionality...\n');

// Test 1: Create .next directory
console.log('1️⃣ Creating .next directory...');
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir);
  console.log('   ✅ Created .next directory');
} else {
  console.log('   ℹ️  .next directory already exists');
}

// Test 2: Create a test file inside .next
console.log('2️⃣ Creating test file inside .next...');
const testFile = path.join(nextDir, 'test.txt');
fs.writeFileSync(testFile, 'This is a test file');
console.log('   ✅ Created test file');

// Test 3: Verify .next exists
console.log('3️⃣ Verifying .next directory exists...');
if (fs.existsSync(nextDir)) {
  console.log('   ✅ .next directory exists');
} else {
  console.log('   ❌ .next directory does not exist');
}

console.log('\n🎯 Now run: npm run clean');
console.log('   This should remove the .next directory');
console.log('   Then run: npm run clean:dev');
console.log('   This should clean and start the dev server');
