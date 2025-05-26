const fetch = require('node-fetch');

function generateRandomLevelData(username, password) {
  // Minimal example with random objects encoded as a level string (this is very simplified)
  const randomLevelString = '0,0,0,0,0'; // You can generate a real GD level string here

  return {
    gameVersion: '21',
    binaryVersion: '35',
    secret: 'Wmfd2893gb7',
    gjp: password,  // Password encoded (GD encrypts it — for demo send plaintext, may fail)
    userName: username,
    levelName: `RandomLevel_${Date.now()}`,
    levelDesc: 'Uploaded via proxy',
    levelVersion: '3',
    levelString: randomLevelString,
    auto: '0',
    twoPlayer: '0',
    coins: '0',
    requestedStars: '0',
    length: '1',
    // Add any other required params here
  };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  // Generate level data for upload
  const levelData = generateRandomLevelData(username, password);

  // Convert to URL-encoded string
  const params = new URLSearchParams(levelData);

  try {
    const response = await fetch('https://boomlings.com/database/uploadGJLevel21.php', {
      method: 'POST',
      headers: {
        'User-Agent': 'GeometryDash/35 (iOS; Apple iPhone)',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const text = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
