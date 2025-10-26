import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, X, ShoppingBag } from 'lucide-react';
import OrderModal from './OrderModal';

const CartButton = ({ cartItems = [], onCartUpdate = () => {} }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      onCartUpdate(cartItems.filter(item => item.id !== productId));
    } else {
      onCartUpdate(
        cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (productId) => {
    onCartUpdate(cartItems.filter(item => item.id !== productId));
  };

  const handleConfirmOrder = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  // 1. Botón principal del carrito (antes degradado slate-700/800)
  return (
    <>
      <div className="relative">
        <motion.button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative w-12 h-12 bg-[#C5E952] text-gray-900 rounded-2xl flex items-center justify-center hover:bg-[#B3D648] transition-all duration-300 shadow-lg shadow-[#C5E952]/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              className="absolute top-16 right-0 w-96 max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-slate-700" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Mi Carrito ({totalItems})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Tu carrito está vacío</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Agrega productos para comenzar
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                        layout
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-slate-600 font-bold text-sm">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-white rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {/* 2. Botón de Confirmar Pedido (antes degradado slate-700/800) */}
                  <motion.button
                    onClick={handleConfirmOrder}
                    className="w-full py-3 bg-[#C5E952] text-gray-900 rounded-2xl font-semibold hover:bg-[#B3D648] transition-all duration-300 shadow-lg shadow-[#C5E952]/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirmar Pedido
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default CartButton;