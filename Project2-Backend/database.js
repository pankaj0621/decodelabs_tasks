const fs = require('fs');
const path = require('path');

// Database file ka path
const DB_PATH = path.join(__dirname, 'db.json');

// Agar db.json nahi hai, toh ek empty array ke sath create karein
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

// Helper: Read Data
function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper: Write Data
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ===== DATABASE OPERATIONS =====

const db = {
  // Sabhi users ko get karna
  getAllUsers: () => {
    return readDB();
  },

  // Single user by ID
  getUserById: (id) => {
    const users = readDB();
    const user = users.find(u => u.id === id);
    return user 
      ? { success: true, data: user }
      : { success: false, message: "User not found" };
  },

  // Naya user create karna
  createUser: (name, email, role) => {
    const users = readDB();
    
    // Check for unique email
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      role
    };

    users.push(newUser);
    writeDB(users);
    return { success: true, data: newUser };
  },

  // User update karna
  updateUser: (id, fields) => {
    const users = readDB();
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return { success: false, message: "User not found" };

    users[index] = { ...users[index], ...fields };
    writeDB(users);
    return { success: true, data: users[index] };
  },

  // User delete karna
  deleteUser: (id) => {
    const users = readDB();
    const filteredUsers = users.filter(u => u.id !== id);

    if (users.length === filteredUsers.length) {
      return { success: false, message: "User not found" };
    }

    writeDB(filteredUsers);
    return { success: true, message: "User deleted successfully" };
  }
};

module.exports = db;