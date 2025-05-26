import fetch from 'node-fetch';

export default async function handler(req, res) {
  console.log("Request received:", req.method);

  if (req.method !== 'POST') {
    console.log("Method not allowed:", req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { userName, password, email } = req.body;
  console.log("Request body:", req.body);

  if (!userName || !password || !email) {
    console.log("Missing fields:", { userName, password, email });
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  const formBody = new URLSearchParams({
    userName,
    password,
    email,
  }).toString();

  console.log("Form data to send:", formBody);

  try {
    const boomlingsResponse = await fetch(
      'https://www.boomlings.com/database/accounts/createGJAccount.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'GeometryDash/2.204',
        },
        body: formBody,
      }
    );

    const text = await boomlingsResponse.text();
    console.log("Boomlings response:", text);

    res.status(200).send(text);
  } catch (error) {
    console.error("Error in fetch:", error);
    res.status(500).json({ error: error.message });
  }
}
