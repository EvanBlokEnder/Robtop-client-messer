// Simple in-memory user store & sessions (for demo only)
let users = {};
let sessions = {};

const crypto = require('crypto');

function createSession(username) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  sessions[sessionId] = username;
  return sessionId;
}

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, username, password, sessionId } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  if (action === 'register') {
    if (users[username]) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    users[username] = { password };
    const newSessionId = createSession(username);
    return res.json({ success: true, sessionId: newSessionId });
  }

  if (action === 'login') {
    if (!users[username] || users[username].password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const newSessionId = createSession(username);
    return res.json({ success: true, sessionId: newSessionId });
  }

  return res.status(400).json({ error: 'Invalid action' });
};
