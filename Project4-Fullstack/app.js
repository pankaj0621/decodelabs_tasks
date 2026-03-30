// ===================================================
// DecodeLabs Internship 2026 - Project 4
// Full Stack Integration - Frontend + Backend + DB
// Developer: Pankaj Kumar
// Email: pankaj21.com@gmail.com
// ===================================================

const API_URL = 'http://localhost:4000/api/users';

let allUsers = []; // local cache for search/filter

// ===== ON PAGE LOAD =====
window.addEventListener('DOMContentLoaded', () => {
  checkServerStatus();
  loadUsers();
});

// ===================================================
// CHECK SERVER STATUS
// ===================================================
async function checkServerStatus() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');

  try {
    const res = await fetch('http://localhost:4000/');
    if (res.ok) {
      dot.className = 'status-dot online';
      text.textContent = 'API Connected ✅';
    } else {
      throw new Error();
    }
  } catch {
    dot.className = 'status-dot offline';
    text.textContent = 'API Offline ❌';
  }
}

// ===================================================
// LOAD ALL USERS (READ)
// ===================================================
async function loadUsers() {
  const loading = document.getElementById('loadingDiv');
  const errorDiv = document.getElementById('errorDiv');
  const tableWrapper = document.getElementById('tableWrapper');

  loading.style.display = 'flex';
  errorDiv.style.display = 'none';
  tableWrapper.style.display = 'none';

  try {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const data = await res.json();
    // Check if data is wrapped in .data or is a direct array
    allUsers = data.success ? data.data : data;

    updateStats(allUsers);
    renderTable(allUsers);

    loading.style.display = 'none';
    tableWrapper.style.display = 'block';

  } catch (err) {
    loading.style.display = 'none';
    errorDiv.style.display = 'block';
    console.error('Failed to load users:', err.message);
  }
}

// ===================================================
// UPDATE STATS
// ===================================================
function updateStats(users) {
  document.getElementById('totalCount').textContent = users.length;

  const devCount = users.filter(u => u.role === 'Developer').length;
  document.getElementById('devCount').textContent = devCount;

  if (users.length > 0) {
    const last = users[users.length - 1];
    document.getElementById('lastAdded').textContent = last.name.split(' ')[0];
  } else {
    document.getElementById('lastAdded').textContent = '-';
  }
}

// ===================================================
// RENDER TABLE WITH ANIMATION
// ===================================================
function renderTable(users) {
  const tbody = document.getElementById('userTableBody');
  const noResults = document.getElementById('noResults');

  if (users.length === 0) {
    tbody.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  // Render rows with an inline style for animation delay
  tbody.innerHTML = users.map((user, index) => `
    <tr id="row-${user.id}" style="opacity: 0; transform: translateY(10px); animation: fadeIn 0.4s ease forwards ${index * 0.05}s;">
      <td><strong>#${user.id}</strong></td>
      <td>${escapeHTML(user.name)}</td>
      <td>${escapeHTML(user.email)}</td>
      <td>
        <span class="role-badge role-${user.role}">
          ${escapeHTML(user.role)}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="btn-sm btn-edit"
            onclick="openEditModal(${user.id}, '${escapeHTML(user.name)}', '${escapeHTML(user.email)}', '${escapeHTML(user.role)}')">
            ✏️
          </button>
          <button class="btn-sm btn-delete"
            onclick="deleteUser(${user.id}, '${escapeHTML(user.name)}')">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ===================================================
// SEARCH / FILTER
// ===================================================
function filterUsers() {
  const query = document.getElementById('searchInput').value.toLowerCase();

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(query) ||
    u.role.toLowerCase().includes(query) ||
    u.email.toLowerCase().includes(query)
  );

  renderTable(filtered);
}

// ===================================================
// ADD USER - POST request to API
// ===================================================
async function addUser() {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const roleInput = document.getElementById('roleInput');
  const btn = document.getElementById('addBtn');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleInput.value;

  if (!name || !email || !role) {
    showFormMsg('⚠️ Please fill in all fields.', 'error');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Adding...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showFormMsg(`✅ User added!`, 'success');
      nameInput.value = '';
      emailInput.value = '';
      roleInput.value = '';
      await loadUsers();
    } else {
      showFormMsg(`❌ ${data.message}`, 'error');
    }
  } catch (err) {
    showFormMsg('❌ API Error.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Add User';
  }
}

// ===================================================
// EDIT & DELETE LOGIC (Same as before but cleaned)
// ===================================================
function openEditModal(id, name, email, role) {
  document.getElementById('editId').value = id;
  document.getElementById('editName').value = name;
  document.getElementById('editEmail').value = email;
  document.getElementById('editRole').value = role;
  document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

async function saveEdit() {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const role = document.getElementById('editRole').value;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role })
    });
    if (res.ok) {
      closeModal();
      await loadUsers();
    }
  } catch (err) {
    alert("Update failed.");
  }
}

async function deleteUser(id, name) {
  if (!confirm(`Delete "${name}"?`)) return;
  
  const row = document.getElementById(`row-${id}`);
  row.style.transition = '0.3s';
  row.style.opacity = '0';
  row.style.transform = 'scale(0.95)';

  setTimeout(async () => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await loadUsers();
    } catch (err) {
      alert("Delete failed.");
    }
  }, 300);
}

// ===================================================
// HELPERS
// ===================================================
function showFormMsg(msg, type) {
  const el = document.getElementById('formMsg');
  el.textContent = msg;
  el.className = `alert alert-${type}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'editModal') closeModal();
});