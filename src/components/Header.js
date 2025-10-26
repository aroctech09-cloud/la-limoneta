import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import CartButton from './CartButton';

const Header = ({ 
  cartItems = [], 
  onCartUpdate = () => {}, 
  searchTerm = '', 
  onSearchChange = () => {},
  selectedCategory = 'all',
  onCategoryChange = () => {},
  categories = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <motion.header 
      className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            {/* 1. Fondo del logo 'L' (antes degradado slate-700/800) */}
            <div className="w-10 h-10 bg-[#C5E952] rounded-xl flex items-center justify-center">
              <span className="text-gray-900 font-bold text-lg">L</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                La limoneta
              </h1>
              <p className="text-sm text-gray-500 font-medium">Tu antojo al alcance de tu mano</p>
            </div>
          </motion.div>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500/30 focus:border-slate-500 transition-all duration-300 text-gray-900 font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CartButton 
              cartItems={cartItems}
              onCartUpdate={onCartUpdate}
            />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <motion.div 
          className={`lg:block overflow-hidden transition-all duration-300 ${isMenuOpen ? 'block mt-4' : 'hidden'}`}
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
        >
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/50 lg:border-t-0 lg:pt-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;