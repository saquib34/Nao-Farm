import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data
const productsData = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'src/data/products.json'), 
  'utf-8'
));

// API Routes

// Get all crops
app.get('/api/crops', (req, res) => {
  setTimeout(() => {
    res.json(productsData.crops);
  }, 500); // Simulate network delay
});

// Get crop by ID
app.get('/api/crops/:id', (req, res) => {
  const { id } = req.params;
  const crop = productsData.crops.find(c => c.id === id);
  
  if (!crop) {
    return res.status(404).json({ error: "Crop not found" });
  }
  
  setTimeout(() => {
    res.json(crop);
  }, 300);
});

// Get all products
app.get('/api/products', (req, res) => {
  setTimeout(() => {
    res.json(productsData.products);
  }, 500);
});

// Get product that matches a crop
app.get('/api/products/match/:cropId', (req, res) => {
  const { cropId } = req.params;
  const product = productsData.products.find(p => p.cropId === cropId);
  
  if (!product) {
    return res.status(404).json({ error: "No matched product found" });
  }
  
  setTimeout(() => {
    res.json(product);
  }, 700);
});

// Get crop and matched product information
app.get('/api/mapping', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  
  // Try to find by ID first
  let crop = productsData.crops.find(c => c.id === query);
  
  // If not found by ID, try by name
  if (!crop) {
    crop = productsData.crops.find(c => c.name.toLowerCase() === query.toLowerCase());
  }
  
  if (!crop) {
    return res.status(404).json({ 
      error: "Crop not found",
      crop: null,
      matchedProduct: null
    });
  }
  
  const product = productsData.products.find(p => p.cropId === crop.id);
  
  if (!product) {
    return res.status(404).json({
      error: "No matched product found",
      crop,
      matchedProduct: null
    });
  }
  
  setTimeout(() => {
    res.json({
      crop,
      matchedProduct: product
    });
  }, 800);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;