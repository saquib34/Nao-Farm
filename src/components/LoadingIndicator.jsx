import { motion } from 'framer-motion';

const LoadingIndicator = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  
  const circleVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -15, 0],
      transition: { 
        repeat: Infinity,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };
  
  const colors = [
    "bg-nori-green",
    "bg-nori-accent",
    "bg-nori-light"
  ];
  
  return (
    <motion.div 
      className="flex justify-center items-center py-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex space-x-3">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className={`${color} w-3 h-3 rounded-full`}
            variants={circleVariants}
            custom={index}
          />
        ))}
      </div>
      <p className="ml-4 text-gray-600">Connecting crop to product...</p>
    </motion.div>
  );
};

export default LoadingIndicator;