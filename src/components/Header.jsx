import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="bg-nori-green text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <motion.div 
            className="mr-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 5a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/>
            </svg>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold">Nori Farm</h1>
            <p className="text-xs opacity-75">Virtual to Real Integration</p>
          </div>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-nori-accent transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-nori-accent transition-colors duration-200">My Crops</a>
            </li>
            <li>
              <a href="#" className="hover:text-nori-accent transition-colors duration-200">Shop</a>
            </li>
          </ul>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;