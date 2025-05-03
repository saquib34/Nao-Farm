import { motion } from 'framer-motion';

const SearchForm = ({ searchInput, setSearchInput, handleSearch }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card mb-8"
    >
      <h2 className="text-xl font-semibold text-nori-dark mb-4">Find Your Product Match</h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="cropSearch" className="block text-gray-700 mb-2">
            Enter Crop Name or ID (e.g., "Tomato #124" or "tomato-124")
          </label>
          <div className="flex">
            <input
              type="text"
              id="cropSearch"
              className="input flex-1"
              placeholder="Enter crop name or ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary ml-2"
            >
              Search
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Try searching for: Tomato #124, Carrot #56, Lettuce #78, or Potato #42
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchForm;