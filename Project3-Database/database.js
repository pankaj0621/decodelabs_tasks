// ===================================================
// DecodeLabs Internship - Project 3: Database Layer
// Simple JSON File Database (No MongoDB install needed)
// ===================================================

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// ===== Initialize DB file if not exists =====
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [
        { id: 1, name: "Alex Johnson", email: "alex@email.com", role: "Developer", createdAt: new Date().toISOString() },
        { id: 2, name: "Priya Sharma", email: "priya@email.com", role: "Designer", createdAt: new Date().toISOString() },
        { id: 3, name: "Rahul Verma", email: "rahul@email.com", role: "Tester", createdAt: new Date().toISOString() }
      ],
      nextId: 4
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Database initialized: db.json created');
  }
}

// ===== READ all data from DB =====
function readDB() {
  initDB();
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

// ===== WRITE data to DB =====
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ===== CRUD OPERATIONS =====

// CREATE - Add new user
function createUser(name, email, role) {
  const db = readDB();

  // Check duplicate email (UNIQUE constraint)
  const exists = db.users.find(u => u.email === email);
  if (exists) {
    return { success: false, message: 'Email already exists' };
  }

  const newUser = {
    id: db.nextId++,
    name,
    email,
    role,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  return { success: true, data: newUser };
}

// READ - Get all users
function getAllUsers() {
  const db = readDB();
  return { success: true, count: db.users.length, data: db.users };
}

// READ - Get user by ID
function getUserById(id) {
  const db = readDB();
  const user = db.users.find(u => u.id === id);

  if (!user) {
    return { success: false, message: `User with ID ${id} not found` };
  }

  return { success: true, data: user };
}

// UPDATE - Update user by ID
function updateUser(id, fields) {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === id);

  if (index === -1) {
    return { success: false, message: `User with ID ${id} not found` };
  }

  db.users[index] = {
    ...db.users[index],
    ...fields,
    updatedAt: new Date().toISOString()
  };

  writeDB(db);
  return { success: true, data: db.users[index] };
}

// DELETE - Delete user by ID
function deleteUser(id) {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === id);

  if (index === -1) {
    return { success: false, message: `User with ID ${id} not found` };
  }

  const deleted = db.users.splice(index, 1)[0];
  writeDB(db);

  return { success: true, data: deleted };
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
