// api/proxy.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // Extract query parameters from the frontend request
    // Example: ?str=username&gameVersion=21&binaryVersion=35
    const {
      str = '',
      gameVersion = '21',
      binaryVersion = '35',
      gdw = '0',
      secret = 'Wmfd2893gb7'
    } = req.query;

    // Build Boomlings user info URL with parameters
    const url = 'https://boomlings.com/database/getGJUserInfo20.php';

    // Construct query string params exactly as Geometry Dash client expects
    const params = new URLSearchParams({
      str,
      gameVersion,
      binaryVersion,
      gdw,
      secret,
    });

    // Make the fetch request pretending to be GD client
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'GeometryDash/35 (iOS; Apple iPhone)',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        // Any other headers GD client sends could be added here
      }
    });

    const text = await response.text();

    // Return raw response text to the frontend
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(text);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
