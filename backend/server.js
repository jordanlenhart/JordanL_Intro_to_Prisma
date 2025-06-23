import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/frontend/src')));

app.get('/api/data', async (req, res) => {
  try {
    const data = await prisma.client.findMany({
      include: {
        orders: {
          include: {
            products: true,  // include products related to each order
          },
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  app.listen(5555, () => {
    console.log("server listening on port 5555")
  });
  