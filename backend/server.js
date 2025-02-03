const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;
const { skateLocations } = require('./data/skateLocations');

app.use(cors());
app.use(express.json());

// Add your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/skateLocations', (req, res) => {
  res.json(skateLocations);
});
