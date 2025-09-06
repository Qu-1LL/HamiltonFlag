const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');

const app = express();
const PORT = 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static React files
app.use(express.static(path.join(__dirname, 'build')));

// Redirect all routes to index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`React app running on http://0.0.0.0:${PORT}`);
});