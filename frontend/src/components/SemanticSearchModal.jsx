import React, { useState } from 'react';
import { Search, Loader2, X, Sparkles } from 'lucide-react';
import { THRIFT_POLAROIDS, ECOMMERCE_V2_HOT_RIGHT_NOW } from '../data/mockData';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useProduct } from '../context/ProductContext';
import './SemanticSearch.css';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy_key");

// All available products to search from
const ALL_PRODUCTS = [
  ...THRIFT_POLAROIDS.map(p => ({ ...p, type: 'thrift' })),
  ...ECOMMERCE_V2_HOT_RIGHT_NOW.map(p => ({ ...p, type: 'ecommerce' }))
];

export default function SemanticSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const { openProduct } = useProduct();

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Missing API Key");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // We pass the products catalog and the user's natural language query
      const productCatalogText = ALL_PRODUCTS.map(p => `ID:${p.id} TYPE:${p.type} TITLE:"${p.title}"`).join('\n');
      
      const prompt = `You are a semantic search engine.
The user is looking for: "${query}"

Here is the catalog of available products:
${productCatalogText}

Return a comma-separated list of product IDs (matching exactly as they appear in the catalog) that best match the user's query. Return ONLY the IDs. If none match well, return an empty string.`;

      const result = await model.generateContent(prompt);
      const output = result.response.text().trim();
      
      let matchedIds = [];
      if (output && !output.toLowerCase().includes('empty')) {
        matchedIds = output.split(',').map(id => id.trim());
      }
      
      // Filter the catalog
      const matchedProducts = ALL_PRODUCTS.filter(p => matchedIds.includes(String(p.id)));
      setResults(matchedProducts);

    } catch (error) {
      console.error("Search Error:", error);
      // Fallback to basic text search if API fails
      const fallback = ALL_PRODUCTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
      setResults(fallback);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="sem-search-overlay">
      <div className="sem-search-modal">
        {/* Header Search Bar */}
        <div className="sem-search-header">
          <Sparkles className="sem-search-icon" size={24} />
          <form onSubmit={handleSearch} className="sem-search-form">
            <input 
              autoFocus
              type="text" 
              placeholder="Ask anything... e.g. 'something warm for winter'"
              className="sem-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {isSearching && <Loader2 className="animate-spin sem-search-icon" style={{color:'#9ca3af'}} size={20} />}
          <button onClick={onClose} className="sem-search-close">
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="sem-search-body">
          {(!results && !isSearching) && (
            <div className="sem-search-empty">
              <Search size={48} className="sem-empty-icon" />
              <p>Type a natural language query to find matching items.</p>
              <div className="sem-search-chips">
                <span onClick={() => setQuery('vintage denim')} className="sem-chip">"vintage denim"</span>
                <span onClick={() => setQuery('wedding party accessories')} className="sem-chip">"wedding party accessories"</span>
              </div>
            </div>
          )}

          {isSearching && (
            <div className="sem-search-empty">
              <Loader2 className="animate-spin sem-empty-icon" style={{opacity:1, color:'#f97316'}} size={32} />
              <p>AI is scanning the catalog...</p>
            </div>
          )}

          {(results && results.length === 0 && !isSearching) && (
            <div className="sem-search-empty">
              <p>No perfect matches found. Try describing it differently!</p>
            </div>
          )}

          {(results && results.length > 0 && !isSearching) && (
            <div className="sem-search-grid">
              {results.map((item, idx) => (
                <div 
                  key={idx} 
                  className="sem-product-card"
                  onClick={() => openProduct({
                    title: item.title,
                    price: item.price || '₹1,999',
                    image: item.img,
                    category: item.tag || item.category || 'Found',
                    seller: item.seller || item.brand || '@seller'
                  })}
                >
                  <div className="sem-product-img" style={{ backgroundImage: `url(${item.img})` }}></div>
                  <div className="sem-product-info">
                    <h5 className="sem-product-title">{item.title}</h5>
                    <p className="sem-product-price">{item.price || '₹1,999'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
