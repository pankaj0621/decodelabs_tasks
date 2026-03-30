// ===================================================
// DecodeLabs Internship - Project 3: Database Integration
// Backend API + JSON File Database (Full CRUD)
// ===================================================

const http = require('http');
const url = require('url');
const db = require('./database');

const PORT = 4000;

// ===== HELPER: Send JSON Response =====
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data, null, 2));
}

// ===== HELPER: Read Request Body =====
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

// ===== MAIN SERVER =====
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    sendJSON(res, 200, {});
    return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

  // ============================================
  // GET / → Welcome
  // ============================================
  if (pathname === '/' && method === 'GET') {
    sendJSON(res, 200, {
      success: true,
      message: '🗄️ DecodeLabs Project 3 — Database Integration API',
      description: 'Data is now stored in db.json file (persistent storage)',
      endpoints: {
        'GET    /': 'Welcome',
        'GET    /api/users': 'Get all users from database',
        'GET    /api/users/:id': 'Get one user by ID',
        'POST   /api/users': 'Create & save new user to database',
        'PUT    /api/users/:id': 'Update user in database',
        'DELETE /api/users/:id': 'Delete user from database'
      }
    });
    return;
  }

  // ============================================
  // GET /api/users → Read all users from DB
  // ============================================
  if (pathname === '/api/users' && method === 'GET') {
    const result = db.getAllUsers();
    sendJSON(res, 200, result);
    return;
  }

  // ============================================
  // GET /api/users/:id → Read one user
  // ============================================
  const userMatch = pathname.match(/^\/api\/users\/(\d+)$/);

  if (userMatch && method === 'GET') {
    const id = parseInt(userMatch[1]);
    const result = db.getUserById(id);
    sendJSON(res, result.success ? 200 : 404, result);
    return;
  }

  // ============================================
  // POST /api/users → Create user in DB
  // ============================================
  if (pathname === '/api/users' && method === 'POST') {
    try {
      const body = await getBody(req);
      const { name, email, role } = body;

      // Validation (NOT NULL constraint)
      if (!name || !email || !role) {
        sendJSON(res, 400, {
          success: false,
          message: 'Validation Error: name, email, and role are required (NOT NULL)'
        });
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        sendJSON(res, 400, {
          success: false,
          message: 'Validation Error: Invalid email format'
        });
        return;
      }

      if (name.length < 2) {
        sendJSON(res, 400, {
          success: false,
          message: 'Validation Error: Name must be at least 2 characters'
        });
        return;
      }

      const result = db.createUser(name, email, role);
      sendJSON(res, result.success ? 201 : 400, result);

    } catch (err) {
      sendJSON(res, 400, { success: false, message: 'Invalid JSON body' });
    }
    return;
  }

  // ============================================
  // PUT /api/users/:id → Update user in DB
  // ============================================
  if (userMatch && method === 'PUT') {
    const id = parseInt(userMatch[1]);

    try {
      const body = await getBody(req);
      const { name, email, role } = body;

      if (!name && !email && !role) {
        sendJSON(res, 400, {
          success: false,
          message: 'Provide at least one field: name, email, or role'
        });
        return;
      }

      const fields = {};
      if (name) fields.name = name;
      if (email) fields.email = email;
      if (role) fields.role = role;

      const result = db.updateUser(id, fields);
      sendJSON(res, result.success ? 200 : 404, result);

    } catch (err) {
      sendJSON(res, 400, { success: false, message: 'Invalid JSON body' });
    }
    return;
  }

  // ============================================
  // DELETE /api/users/:id → Delete from DB
  // ============================================
  if (userMatch && method === 'DELETE') {
    const id = parseInt(userMatch[1]);
    const result = db.deleteUser(id);
    sendJSON(res, result.success ? 200 : 404, result);
    return;
  }

  // 404
  sendJSON(res, 404, {
    success: false,
    message: `Route ${method} ${pathname} not found`
  });
});

// ===== START =====
server.listen(PORT, () => {
  console.log('========================================');
  console.log('  DecodeLabs Project 3 - DB API LIVE!');
  console.log(`  URL: http://localhost:${PORT}`);
  console.log('  Database: db.json (persistent storage)');
  console.log('========================================');
  console.log('Try these in browser:');
  console.log(`  http://localhost:${PORT}/`);
  console.log(`  http://localhost:${PORT}/api/users`);
  console.log(`  http://localhost:${PORT}/api/users/1`);
  console.log('========================================');
});
