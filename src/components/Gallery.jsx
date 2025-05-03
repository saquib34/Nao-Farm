import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCrops } from '../services/apiService';
import LoadingIndicator from './LoadingIndicator';

const Gallery = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const data = await getCrops();
        setCrops(data);
      } catch (err) {
        setError('Failed to load crops. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <LoadingIndicator />;
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-nori-dark mb-6">Available Crops</h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {crops.map((crop) => (
          <motion.div
            key={crop.id}
            className="card hover:shadow-xl group"
            variants={itemVariants}
          >
            <div className="overflow-hidden rounded-lg mb-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={crop.image}
                alt={crop.name}
                className="w-full h-40 object-cover"
              />
            </div>
            
            <h3 className="text-lg font-semibold text-nori-dark group-hover:text-nori-green transition-colors">
              {crop.name}
            </h3>
            
            <div className="flex justify-between items-center mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                crop.growthStage === "Harvested" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {crop.growthStage}
              </span>
              
              <span className="text-sm text-gray-500">
                Planted: {crop.plantedDate}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary w-full mt-4"
              onClick={() => window.location.href = `/?crop=${crop.id}`}
            >
              Find Match
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;