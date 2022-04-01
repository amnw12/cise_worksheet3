const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/books', books);

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/books_app/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'frontend/books_app/build/index.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

