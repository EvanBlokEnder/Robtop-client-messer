import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Expect JSON body with userName, password, email
  const { userName, password, email } = req.body;

  if (!userName || !password || !email) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  // Build form data as Boomlings expects
  const formBody = new URLSearchParams({
    userName,
    password,
    email,
  }).toString();

  try {
    const boomlingsResponse = await fetch('https://www.boomlings.com/database/accounts/createGJAccount.php
', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'GeometryDash/2.204',
      },
      body: formBody,
    });

    const text = await boomlingsResponse.text();

    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
