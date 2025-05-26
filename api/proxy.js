import fetch from 'node-fetch';

async function sendGeometryDashRequest() {
  const url = 'https://boomlings.com/database';

  // This JSON is an example of what the GD client might send in body
  // (Note: Boomlings.com/database expects POST with 'gameVersion' param usually)
  const jsonBody = {
    gameVersion: 21,       // example Geometry Dash version number
    binaryVersion: 35,     // example binary version number
    gdw: 0,                // unknown, sometimes 0 or 1
    secret: "Wmfd2893gb7", // typical Geometry Dash secret key for authentication
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent': 'GeometryDash/21.1 (Windows NT 10.0; Win64; x64)', // pretend client user agent
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://geometrydash.com',
        'Referer': 'https://geometrydash.com/',
        // Any other headers that mimic GD client can be added here
      },
      body: JSON.stringify(jsonBody),
    });

    if (!response.ok) {
      throw new Error(`Network response was not OK: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error during request:', error.message);
  }
}

sendGeometryDashRequest();
