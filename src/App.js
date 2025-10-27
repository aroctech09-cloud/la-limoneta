import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import { products, categories } from './data/products';
import { addToCart } from './utils/cartUtils';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    setCartItems(currentCart => addToCart(currentCart, product));
  };

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header
        cartItems={cartItems}
        onCartUpdate={handleCartUpdate}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#8EB33F] mb-4">
              La Limoneta
            </h1>
            <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
              Descubre nuestra selección variada de productos de alta calidad
            </p>

            <motion.div
              className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
            </motion.div>
          </motion.div>

          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
        </motion.div>
      </main>

      <motion.footer
        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-slate-800 font-bold text-lg">L</span>
            </div>
            <h3 className="text-2xl font-bold">La limoneta 🍋‍🟩</h3>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Tu cafeteria de confianza con los mejores productos y el mejor servicio al cliente.
            Horario de atención: 9am - 4pm todos los días.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span>© 2025 La limioneta</span>
            <span>•</span>
            <span>Políticas de Privacidad</span>
            <span>•</span>
            <span>Términos y Condiciones</span>
            <span>•</span>
            <span>Contacto</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;