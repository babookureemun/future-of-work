export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
```
3. Press **Ctrl + S** to save

---

**Step 3 — Update the API URL in App.jsx**

1. Open `src/App.jsx` in Notepad
2. Press **Ctrl + H** to open Find & Replace
3. In **Find** box paste:
```
https://api.anthropic.com/v1/messages
```
4. In **Replace** box paste:
```
/api/claude