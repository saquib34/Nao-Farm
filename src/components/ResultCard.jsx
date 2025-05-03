import { motion } from 'framer-motion';
import NotFound from './NotFound';

const ResultCard = ({ result }) => {
  const { crop, matchedProduct, error } = result;
  
  // If both crop and product are missing, show error
  if (!crop && !matchedProduct) {
    return <NotFound message={error || "Crop not found"} />;
  }
  
  // If crop exists but no matched product
  if (crop && !matchedProduct) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Crop Information */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-nori-dark mb-2">Your Virtual Crop</h3>
            <div className="mb-4 overflow-hidden rounded-lg">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={crop.image}
                alt={crop.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {crop.name}</p>
              <p><span className="font-medium">Status:</span> {crop.growthStage}</p>
              <p><span className="font-medium">Planted:</span> {crop.plantedDate}</p>
            </div>
          </div>
          
          {/* No Product Found Message */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-yellow-500 mx-auto mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Product Match</h3>
              <p className="text-yellow-700 mb-4">
                We couldn't find a matching product for this crop.
              </p>
              <p className="text-sm text-yellow-600">
                This crop may still be growing or there might be no stock available at the moment.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-2">API Response:</h4>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
            {JSON.stringify({
              crop: crop.name,
              matchedProduct: null,
              error: "No matched product found"
            }, null, 2)}
          </pre>
        </div>
      </motion.div>
    );
  }
  
  // Full result with both crop and product
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Crop Information */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-nori-dark mb-2">Your Virtual Crop</h3>
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-50">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={crop.image}
              alt={crop.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {crop.name}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                crop.growthStage === "Harvested" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {crop.growthStage}
              </span>
            </p>
            <p><span className="font-medium">Planted:</span> {crop.plantedDate}</p>
          </div>
        </div>
        
        {/* Arrow Animation */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-nori-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>
        
        {/* Product Information */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-nori-dark mb-2">Matched Real Product</h3>
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-50">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={matchedProduct.image}
              alt={matchedProduct.title}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Product:</span> {matchedProduct.title}</p>
            <p><span className="font-medium">Price:</span> 
              <span className="ml-2 font-semibold text-nori-dark">{matchedProduct.price}</span>
            </p>
            <p className="text-sm text-gray-600">{matchedProduct.description}</p>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={matchedProduct.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full mt-4 block text-center"
          >
            Shop Now
          </motion.a>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium mb-2">API Response:</h4>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
          {JSON.stringify({
            crop: crop.name,
            matchedProduct: {
              title: matchedProduct.title,
              price: matchedProduct.price,
              image: matchedProduct.image,
              buyLink: matchedProduct.buyLink
            }
          }, null, 2)}
        </pre>
      </div>
    </motion.div>
  );
};

export default ResultCard;