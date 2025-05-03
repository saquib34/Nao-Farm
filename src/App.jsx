import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCropProductMapping } from './services/apiService';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';
import LoadingIndicator from './components/LoadingIndicator';
import Gallery from './components/Gallery';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('search');

  // Check URL query params on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cropParam = urlParams.get('crop');
    
    if (cropParam) {
      setSearchInput(cropParam);
      handleSearch(null, cropParam);
    }
  }, []);

  const handleSearch = async (e, cropIdentifier = null) => {
    if (e) e.preventDefault();
    
    const queryInput = cropIdentifier || searchInput.trim();
    
    if (!queryInput) {
      setError('Please enter a crop name or ID');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await getCropProductMapping(queryInput);
      
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response);
        // Update URL with the crop ID for shareable links
        const url = new URL(window.location);
        url.searchParams.set('crop', response.crop.id);
        window.history.pushState({}, '', url);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-nori-dark mb-2">Nori Farm Product Integration</h1>
            <p className="text-gray-600">Connect your virtual crops to real-world products</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'search' 
                  ? 'border-b-2 border-nori-green text-nori-dark' 
                  : 'text-gray-500 hover:text-nori-dark'
              }`}
              onClick={() => setActiveTab('search')}
            >
              Search
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'gallery' 
                  ? 'border-b-2 border-nori-green text-nori-dark' 
                  : 'text-gray-500 hover:text-nori-dark'
              }`}
              onClick={() => setActiveTab('gallery')}
            >
              Browse Crops
            </button>
          </div>
          
          {/* Search Tab Content */}
          {activeTab === 'search' && (
            <>
              <SearchForm 
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSearch={handleSearch}
              />
              
              {loading && <LoadingIndicator />}
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4"
                >
                  {error}
                </motion.div>
              )}
              
              {result && <ResultCard result={result} />}
            </>
          )}
          
          {/* Gallery Tab Content */}
          {activeTab === 'gallery' && <Gallery />}
        </motion.div>
      </main>
      
      <footer className="bg-nori-dark text-white py-4 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Nori Farm Integration Prototype | XrisP Developer Assessment</p>
        </div>
      </footer>
    </div>
  );
}

export default App;