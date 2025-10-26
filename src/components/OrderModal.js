import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CreditCard, DollarSign, Copy, CheckCircle, MessageCircle } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, cartItems = [], totalPrice = 0 }) => {
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const bankAccount = '1234-5678-9012-3456';
  const whatsappNumber = '8441033557';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      alert('Por favor ingresa tu nombre para continuar.');
      return;
    }

    const orderDetails = cartItems.map(item =>
      `• ${item.name} - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    const paymentInfo = paymentMethod === 'transfer'
      ? `Método de pago: Transferencia bancaria%0ACuenta: ${bankAccount}`
      : 'Método de pago: Efectivo al recoger';

    const message = `¡Hola! Quiero confirmar mi pedido:%0A%0A` +
      `Nombre: ${customerName}%0A%0A` +
      `${orderDetails}%0A%0ATotal: $${totalPrice.toFixed(2)}%0A%0A` +
      `${paymentInfo}%0A%0AHorario de recolección: 9am - 4pm`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
  className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  transition={{ duration: 0.2 }}
  onClick={(e) => e.stopPropagation()}
>

            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Confirmar Pedido
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Revisa los detalles antes de continuar
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Horario */}
              <motion.div
                className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Horario de Recolección
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Puedes pasar por tu pedido en un horario de <strong>9am - 4pm</strong>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Método de pago */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-semibold text-gray-900 mb-3">Método de Pago:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-slate-600"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Transferencia Bancaria</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-slate-600"
                    />
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Efectivo al Recoger</span>
                  </label>
                </div>
              </motion.div>

              {/* Cuenta bancaria */}
              {paymentMethod === 'transfer' && (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-2xl p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h5 className="font-semibold text-green-900 mb-2">Número de Cuenta:</h5>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-green-200">
                    <span className="flex-1 font-mono font-semibold text-green-800">
                      {bankAccount}
                    </span>
                    <motion.button
                      onClick={() => copyToClipboard(bankAccount)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${copied
                          ? 'bg-green-200 text-green-800'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Total y campo de nombre */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total a Pagar:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Campo de nombre justo antes del botón */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-900">Nombre para el pedido:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <motion.button
                  onClick={handleConfirmOrder}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirmar Pedido por WhatsApp
                </motion.button>
                <button onClick={onClose} className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Cancelar / Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
