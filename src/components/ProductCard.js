import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';

const ProductCard = ({ 
  product = {}, 
  onAddToCart = () => {}, 
  index = 0 
}) => {
  const handleAddToCart = () => {
    if (product.stock > 0) {
      onAddToCart(product);
    }
  };
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden group hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
        
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          </div>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold">
              Agotado
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <span className="text-xs text-gray-400 font-medium">
             
            </span>
          </div>
          {/* 1. Botón de Agregar (antes degradado slate-700/800) */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#C5E952] text-gray-900 hover:bg-[#B3D648] hover:shadow-lg shadow-[#C5E952]/50'
            }`}
            whileHover={product.stock > 0 ? { scale: 1.05 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:block">
              {product.stock === 0 ? 'Agotado' : 'Agregar'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;