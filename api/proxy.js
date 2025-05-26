// /api/proxy.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://boomlings.com/database', {
      method: 'GET',
      headers: {
        // Geometry Dash client User-Agent (example from network captures)
        'User-Agent': 'GeometryDash/2.111 (Linux; U; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36',
        // Geometry Dash sometimes sends these headers:
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'Keep-Alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://boomlings.com/database',
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        message: `Failed to fetch Boomlings database: ${response.statusText}`
      });
    }

    const text = await response.text();

    return res.status(200).json({
      success: true,
      status: response.status,
      snippet: text.slice(0, 300)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
