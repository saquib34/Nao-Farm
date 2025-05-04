# Nori Farm Integration API

Backend API server for the Nori Farm Integration prototype that maps virtual crops to real-world products.

## Repository Structure

```
nori-farm-api/
├── server.js            # Main server code
├── package.json         # Dependencies and scripts
└── src/
    └── data/
        └── products.json  # Sample data for crops and products
```

## API Endpoints

The server provides the following API endpoints:

- `GET /` - Health check and API info
- `GET /api/crops` - Get all available crops
- `GET /api/crops/:id` - Get a specific crop by ID
- `GET /api/products` - Get all available products
- `GET /api/products/match/:cropId` - Find a product that matches a specific crop
- `GET /api/mapping?query=` - Get crop and product mapping by crop name or ID

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/your-username/nori-farm-api.git
cd nori-farm-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on port 3000 by default. For development with auto-restart:
```bash
npm run dev
```

## Deploying to Render via GitHub

This repository is optimized for direct deployment to Render using GitHub integration. Follow these steps:

1. Push this repository to your GitHub account

2. In Render dashboard:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Use the following settings:
     - **Name**: nori-farm-api (or your preferred name)
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free (or select appropriate plan)

3. Click "Create Web Service"

4. Render will automatically deploy your API when you push changes to your repository

## Environment Variables

The server uses the following environment variables:

- `PORT` - The port to run the server on (default: 3000, automatically set by Render)

## Example Usage

Once deployed, you can access the API using the following endpoints:

- List all crops: `GET https://your-render-url.onrender.com/api/crops`
- Get a specific crop: `GET https://your-render-url.onrender.com/api/crops/tomato-124`
- Get a matching product: `GET https://your-render-url.onrender.com/api/mapping?query=Tomato%20%23124`

## Sample Response

```json
{
  "crop": {
    "id": "tomato-124",
    "name": "Tomato #124",
    "image": "https://images.unsplash.com/photo-1607305387299-a3d9611cd469",
    "growthStage": "Harvested",
    "plantedDate": "2025-01-15"
  },
  "matchedProduct": {
    "id": "prod-124",
    "cropId": "tomato-124",
    "title": "Fresh Organic Tomato Box",
    "price": "19,000 KRW",
    "image": "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
    "description": "Box of 6 organically grown fresh tomatoes from local farms",
    "buyLink": "https://nori-farm-shop.com/product/123"
  }
}
```