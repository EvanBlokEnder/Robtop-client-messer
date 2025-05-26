const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  // Compose form params as GD expects
  const params = new URLSearchParams({
    str: username,
    gjp: password,         // Password encoded? GD uses base64 or special encoding, but sometimes plaintext works.
    gameVersion: '21',
    binaryVersion: '35',
    secret: 'Wmfd2893gb7',
  });

  try {
    const response = await fetch('https://boomlings.com/database/getGJUserInfo20.php', {
      method: 'POST',
      headers: {
        'User-Agent': 'GeometryDash/35 (iOS; Apple iPhone)',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const text = await response.text();

    if (text.startsWith('-1')) {
      // Login failed
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Login success, return user info
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
