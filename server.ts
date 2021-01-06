import express from 'express';
import cors from 'cors';

const app = express();

// Example
app.get('/api/customers', cors(), (req, res) => {
  const customers = [{ id: 1, name: 'John' }];

  res.json(customers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
