import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://boomlings.com/database", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                      "AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/115.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "https://boomlings.com/",
      },
    });

    const text = await response.text();

    res.status(response.status).set({
      "Content-Type": "text/html",
    }).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
