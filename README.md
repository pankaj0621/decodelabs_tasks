# DecodeLabs Internship Projects
**Developer:** Pankaj Kumar
**Email:** pankaj21.com@gmail.com
**Batch:** 2026 | Full Stack Development
**Organization:** DecodeLabs, Greater Lucknow, India

---

## Project 1 — Responsive Frontend Interface

### Description
A fully responsive personal portfolio website built with pure HTML5, CSS3, and JavaScript. No frameworks used — fundamentals first approach as required by DecodeLabs.

### Features
- Mobile-first responsive design (works on all screen sizes)
- Sticky navigation with hamburger menu for mobile
- Animated floating avatar in hero section
- Skills section with animated progress bars
- 4 project cards showcasing all internship work
- Contact form with frontend validation
- Smooth scroll and scroll-based animations using IntersectionObserver
- Active nav link highlight on scroll

### How to Run
1. Open `Project1-Frontend` folder
2. Double-click `index.html`
3. Opens directly in browser — no server needed!

### Technologies Used
- HTML5 — Semantic landmarks (header, nav, main, section, footer)
- CSS3 — Grid, Flexbox, Media Queries, CSS Variables, Animations
- JavaScript — DOM manipulation, IntersectionObserver, Events

---

## Project 2 — Backend API Development

### Description
A RESTful API server built with pure Node.js (no Express framework). Handles full CRUD operations with proper HTTP status codes, data validation, and CORS headers.

### API Endpoints
| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| GET | `/` | Welcome & API info | 200 |
| GET | `/api/users` | Get all users | 200 |
| GET | `/api/users/:id` | Get user by ID | 200 / 404 |
| POST | `/api/users` | Create new user | 201 / 400 |
| PUT | `/api/users/:id` | Update user | 200 / 404 |
| DELETE | `/api/users/:id` | Delete user | 200 / 404 |

### How to Run
```bash
cd Project2-Backend
node server.js
```
Open browser: `http://localhost:3000`

### Technologies Used
- Node.js built-in `http` and `url` modules
- RESTful API principles (nouns not verbs)
- JSON request/response handling
- Input validation (NOT NULL, email format, duplicate check)
- Proper HTTP status codes (200, 201, 400, 404)
- CORS headers for cross-origin requests

---

## Project 3 — Database Integration

### Description
Backend API connected to a persistent JSON file database. Demonstrates schema design, full CRUD operations, data integrity constraints, and protection against common database vulnerabilities.

### Database Design
```
Users Table / Schema:
  id        → Integer, PRIMARY KEY, auto-increment
  name      → String, NOT NULL, min 2 chars
  email     → String, NOT NULL, UNIQUE
  role      → String, NOT NULL
  createdAt → ISO DateTime string
  updatedAt → ISO DateTime string (on update)
```

### Database Concepts Demonstrated
- **UNIQUE constraint** — No duplicate emails allowed
- **NOT NULL constraint** — Required fields enforced
- **Primary Key** — Auto-incrementing unique ID
- **Parameterized approach** — Input never directly concatenated (prevents injection)
- **Data integrity** — Schema-level validation before write

### How to Run
```bash
cd Project3-Database

# See CRUD demo in terminal:
node test.js

# Start API server:
node server.js
```
Open browser: `http://localhost:4000`

### Files
| File | Purpose |
|------|---------|
| `database.js` | All CRUD functions (createUser, getAllUsers, getUserById, updateUser, deleteUser) |
| `server.js` | REST API routes connected to database layer |
| `test.js` | Demo script showing all CRUD operations working |
| `db.json` | Auto-generated persistent database file |

### Technologies Used
- Node.js `fs` module for file-based storage
- JSON as database format
- CRUD operations mapped to RESTful HTTP methods
- Data validation and integrity constraints

---

## Project 4 — Frontend & Backend Integration (Optional)

### Description
A complete full-stack User Management System where the frontend communicates with the backend API in real-time. Demonstrates the complete IPO (Input-Process-Output) architecture of modern web applications.

### Features
- Live API status indicator (Connected / Offline)
- Real-time user table loaded from backend database
- Add new user — sends POST request to API
- Edit user — sends PUT request to API
- Delete user — sends DELETE request to API (with confirmation)
- Live search/filter users by name, email, or role
- Stats dashboard (total users, developer count, last added)
- Loading spinner during API calls
- Graceful error messages when API is offline
- XSS protection using textContent and escapeHTML
- CORS handling between frontend and backend

### How to Run
**Step 1 — Start backend first:**
```bash
cd Project3-Database
node server.js
```

**Step 2 — Open frontend:**
```bash
cd Project4-FullStack
```
Double-click `index.html` to open in browser.

### Architecture
```
Browser (index.html + app.js)
        ↓  fetch() + async/await
Node.js Server (Project3-Database/server.js) — Port 4000
        ↓  database.js functions
JSON Database (db.json) — Persistent storage
```

### Key Concepts Demonstrated
- `fetch()` API for HTTP requests
- `async/await` for asynchronous code
- CORS (Cross-Origin Resource Sharing)
- JSON serialization and deserialization
- DOM manipulation to display dynamic data
- Error handling with `try/catch` and `finally`
- Frontend + backend validation

---

## Complete Project Summary

| Project | Type | Key Skills | Port |
|---------|------|-----------|------|
| Project 1 | Frontend | HTML, CSS, JS, Responsive Design | — |
| Project 2 | Backend | Node.js, REST API, HTTP | 3000 |
| Project 3 | Database | CRUD, Schema, Data Integrity | 4000 |
| Project 4 | Full Stack | fetch, async/await, Integration | 4000 |

---

## How to Run Everything

```bash
# Terminal 1 — Backend + Database
cd Project3-Database
node server.js

# Then open these in browser:
# http://localhost:4000          → API Welcome
# http://localhost:4000/api/users → All users JSON

# Project 1 — Just open file
# Project1-Frontend/index.html → double-click

# Project 4 — Open after starting server
# Project4-FullStack/index.html → double-click
```

---

*Built with dedication during DecodeLabs Industrial Training Internship 2026*
*— Pankaj Kumar*
