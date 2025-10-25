import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, addToCart, removeFromCart, deleteCart } = useCart()
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalMoney = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
    return (
        <div
            className={`fixed inset-0 overflow-hidden z-9999 transition ${isOpen ? "visible" : "invisible"
                }`}
        >
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-gray-500/75 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
            ></div>

            <div className="absolute inset-0 flex justify-end">
                <div
                    className={`relative w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Carro de compras ({totalItems})</h2>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 h-5/6">
                        {cart.length > 0 ? (
                            cart.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex items-center justify-between mb-4 border-b pb-2 border-gray-300"
                                >
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />

                                    <div className="flex-1 ml-3">
                                        <div className="font-semibold text-sm truncate">{product.name}</div>
                                        <div className="text-gray-500 text-xs">${product.price}</div>
                                    </div>
                                    <div className='justify-items-center'>
                                        <div>${product.qty * product.price}</div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="bg-red-500 text-white px-3 rounded-lg font-bold cursor-pointer"
                                                onClick={(e) => {
                                                    removeFromCart(product)
                                                }}
                                            >
                                                -
                                            </button>

                                            <span className="font-semibold text-gray-700">{product.qty}</span>

                                            <button
                                                className="bg-green-600 text-white px-3 rounded-lg font-bold cursor-pointer"
                                                onClick={(e) => {
                                                    addToCart(product)
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Tu carrito está vacío</p>
                        )}
                    </div>
                    <div className="sticky bottom-0 bg-white border-t p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-500">Total</div>
                                <div className="text-lg font-bold">${totalMoney}</div>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    to="/cart"
                                    className={`px-4 py-2 rounded-xl border font-semibold ${cart.length > 0
                                        ? "hover:bg-gray-50"
                                        : "pointer-events-none opacity-50"
                                        }`}
                                    onClick={onClose}
                                >
                                    Ir al carrito
                                </Link>

                                <button
                                    onClick={() => {
                                        if (cart.length > 0) {
                                            alert('Carrito pagado con éxito')
                                            deleteCart()
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-xl font-semibold text-white ${cart.length > 0
                                        ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                        : "bg-green-600/60 pointer-events-none"
                                        }`}
                                >
                                    Pagar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CartDrawer
