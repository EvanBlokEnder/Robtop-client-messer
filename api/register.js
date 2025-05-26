export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");

  const { username, password, email } = req.body;

  const formData = new URLSearchParams();
  formData.append("userName", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("secret", "Wmfd2893gb7");

  try {
    const response = await fetch("https://your-gdps.com/accounts/registerGJAccount.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData
    });

    const result = await response.text();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Error connecting to GDPS server");
  }
}