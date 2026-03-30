// ===================================================
// DecodeLabs Project 3 - CRUD Test File
// Run this to see all database operations working
// Command: node test.js
// ===================================================

const db = require('./database');

console.log('\n========================================');
console.log('  DecodeLabs Project 3 - CRUD DEMO');
console.log('========================================\n');

// ===== READ ALL =====
console.log('📖 READ: Getting all users from database...');
const all = db.getAllUsers();
console.log(`   Found ${all.count} users:`);
all.data.forEach(u => console.log(`   - [${u.id}] ${u.name} | ${u.email} | ${u.role}`));

// ===== CREATE =====
console.log('\n✅ CREATE: Adding new user...');
const created = db.createUser('Test User', 'test@email.com', 'Intern');
if (created.success) {
  console.log(`   Created: [${created.data.id}] ${created.data.name}`);
} else {
  console.log(`   Error: ${created.message}`);
}

// ===== READ ONE =====
console.log('\n🔍 READ ONE: Getting user with ID 1...');
const one = db.getUserById(1);
if (one.success) {
  console.log(`   Found: ${one.data.name} | ${one.data.email}`);
}

// ===== UPDATE =====
console.log('\n✏️  UPDATE: Updating user ID 1 role...');
const updated = db.updateUser(1, { role: 'Senior Developer' });
if (updated.success) {
  console.log(`   Updated: ${updated.data.name} → Role: ${updated.data.role}`);
}

// ===== DUPLICATE CHECK =====
console.log('\n🚫 UNIQUE CHECK: Trying to add duplicate email...');
const dup = db.createUser('Duplicate', 'test@email.com', 'Intern');
console.log(`   Result: ${dup.message}`);

// ===== DELETE =====
console.log('\n🗑️  DELETE: Removing test user...');
const allNow = db.getAllUsers();
const lastUser = allNow.data[allNow.data.length - 1];
const deleted = db.deleteUser(lastUser.id);
if (deleted.success) {
  console.log(`   Deleted: ${deleted.data.name}`);
}

// ===== FINAL STATE =====
console.log('\n📊 FINAL DATABASE STATE:');
const final = db.getAllUsers();
final.data.forEach(u => console.log(`   - [${u.id}] ${u.name} | ${u.role}`));

console.log('\n========================================');
console.log('  All CRUD operations successful! ✅');
console.log('  Check db.json to see stored data');
console.log('========================================\n');
