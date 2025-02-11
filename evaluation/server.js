const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();


app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set the correct MIME type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
