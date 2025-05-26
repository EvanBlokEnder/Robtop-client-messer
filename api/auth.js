import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({ error: 'Missing username or password' });
    return;
  }

  try {
    // Geometry Dash login URL
    const url = 'https://boomlings.com/database/accounts/loginGJAccount.php';

    // Construct form data like GD client expects
    const params = new URLSearchParams();
    params.append('userName', username);
    params.append('password', password);
    params.append('secret', 'Wmfd2893gb7'); // GD secret key
    params.append('gameVersion', '21');
    params.append('binaryVersion', '35');
    params.append('gdw', '0');  // optional params for GD client
    params.append('extra', '');

    // Mimic Geometry Dash client headers (important)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'GDApp/21 (iOS 12.2; iPhone; Scale/3.00)',
        'Accept-Encoding': 'gzip',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'Origin': 'https://boomlings.com',
        'Referer': 'https://boomlings.com/database/accounts/loginGJAccount.php',
      },
      body: params.toString(),
    });

    const text = await response.text();

    // Boomlings returns text starting with "1," on success
    if (text.startsWith('1,')) {
      // Login success — return the full response text
      res.status(200).send(text);
    } else {
      // Login failure — return error message from server or generic error
      const errMsg = text.length ? text : 'Invalid username or password';
      res.status(401).json({ error: errMsg });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
