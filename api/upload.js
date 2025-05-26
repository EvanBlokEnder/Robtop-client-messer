const crypto = require('crypto');

let sessions = {}; // We'll sync with auth.js sessions in a real app (for demo: separate)

function verifySession(sessionId) {
  // For demo, we accept any sessionId - in real app sync with auth.js sessions
  return sessionId && typeof sessionId === 'string';
}

function randomLevel() {
  // Return a JSON representing a random level with random objects for demo
  const numObjects = Math.floor(Math.random() * 10) + 1;
  let objects = [];
  for (let i = 0; i < numObjects; i++) {
    objects.push({
      id: crypto.randomBytes(4).toString('hex'),
      type: ['spike', 'jump_pad', 'coin'][Math.floor(Math.random() * 3)],
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 300)
    });
  }
  return {
    levelId: crypto.randomBytes(6).toString('hex'),
    name: "Random Level",
    objects
  };
}

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.body;
  if (!verifySession(sessionId)) {
    return res.status(401).json({ error: 'Unauthorized: invalid session' });
  }

  const level = randomLevel();

  // Here, you would normally upload or save the level somewhere.

  res.json({ success: true, uploadedLevel: level });
};
