import { motion } from 'framer-motion';

const NotFound = ({ message = "Crop not found", suggestion = "Try searching for a different crop" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card text-center py-10"
    >
      <div className="flex flex-col items-center">
        {/* Animated Plant Icon */}
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
          className="text-nori-green mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19V5M12 5c3.5 0 7-3 7-5-3.5 0-7 3-7 5zm0 0C8.5 5 5 2 5 0c3.5 0 7 3 7 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 13c-3.5-2-5-6-4-9 3.5 2 5 6 4 9zm10 0c3.5-2 5-6 4-9-3.5 2-5 6-4 9z" />
          </svg>
        </motion.div>

        <h2 className="text-2xl font-bold text-nori-dark mb-2">Oops!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <p className="text-gray-500 text-sm mb-8">{suggestion}</p>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="btn btn-primary"
          >
            Return Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/?tab=gallery'}
            className="btn btn-secondary"
          >
            Browse Crops
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;