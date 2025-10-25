import React, { useState } from 'react'
import { useCart } from '../context/cartContext';
import { getOptimizeCart, substitucionProduct } from '../api/api';

const CartPage = () => {
    const { cart, addToCart, removeFromCart, deleteCart, fillCart } = useCart()
    const [openSuggest, setOpenSuggest] = useState(false);
    const [openOptimize, setOpenOptimize] = useState(false);
    const [budget, setBudget] = useState(0);
    const [suggestData, setSuggestData] = useState([]);
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalMoney = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
    const handleSuggest = async (product) => {
        const res = await substitucionProduct(product._id)
        setSuggestData({ current: product, suggestions: res.data });
        setOpenSuggest(true);
    };
    const handleOptimizeCart = async () => {
        const productsIds = cart.length > 0 ? cart.map(product => product._id) : [];
        const res = await getOptimizeCart(budget, productsIds)
        if (res.data.products.length > 0) {
            fillCart(res.data.products);
        } else {
            alert("No se encontraron productos con su presupuesto")
        }
        setOpenOptimize(false)
    };


    return (
        <div className='pt-20'>
            <div className="p-6 border-b sticky top-16 bg-white z-50 flex justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    Carro de compras ({totalItems})
                </h2>
                <button
                    className="cursor-pointer bg-cyan-400 hover:bg-cyan-700 text-white font-semibold 
                    px-4 py-2 rounded-xl transition-colors duration-300 flex items-center gap-2"
                    onClick={() => setOpenOptimize(true)}
                >
                    ⚡ Optimizar compra
                </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 h-5/6">
                {cart.length > 0 ? (
                    cart.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 border-b pb-3 border-gray-200"
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-14 h-14 md:w-16 md:h-16 object-cover rounded shrink-0"
                            />

                            <div className="w-full md:flex-1 md:ml-3 group">
                                <div className="font-semibold text-sm truncate" title={product.name}>
                                    {product.name}
                                </div>
                                <div className="text-gray-500 text-xs">${product.price}</div>

                                <div className="mt-1 space-y-0.5 text-[10px] text-gray-600 leading-tight block md:hidden">
                                    <div>🌱 {product?.sustainability?.ambiental ?? "-"}</div>
                                    <div>🤝 {product?.sustainability?.social ?? "-"}</div>
                                    <div>💚 {product?.sustainability?.economico ?? "-"}</div>
                                    <div>⭐ {product?.score ?? "-"}</div>
                                </div>
                                <div className="hidden md:block md:group-hover:block mt-1 space-y-0.5 text-[10px] text-gray-600 leading-tight">
                                    <div>🌱 {product?.sustainability?.ambiental ?? "-"}</div>
                                    <div>🤝 {product?.sustainability?.social ?? "-"}</div>
                                    <div>💚 {product?.sustainability?.economico ?? "-"}</div>
                                    <div>⭐ {product?.score ?? "-"}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleSuggest(product)}
                                className="self-start md:self-auto inline-flex items-center gap-1 text-fuchsia-500 text-xs hover:underline cursor-pointer"
                                aria-label="Sugerencias de sustitución"
                            >
                                <span className="md:hidden text-base">💡</span>
                                <span className="hidden md:inline">Sugerencias de sustitución</span>
                            </button>

                            <div className="w-full md:w-auto md:text-right">
                                <div className="font-medium">${product.qty * product.price}</div>

                                <div className="mt-1 flex items-center gap-2">
                                    <button
                                        className="min-w-9 h-9 bg-red-500 text-white px-3 rounded-lg font-bold cursor-pointer active:scale-[0.98]"
                                        onClick={() => removeFromCart(product)}
                                        aria-label="Disminuir cantidad"
                                    >
                                        –
                                    </button>

                                    <span className="w-6 text-center font-semibold text-gray-700">
                                        {product.qty}
                                    </span>

                                    <button
                                        className="min-w-9 h-9 bg-green-600 text-white px-3 rounded-lg font-bold cursor-pointer active:scale-[0.98]"
                                        onClick={() => addToCart(product)}
                                        aria-label="Aumentar cantidad"
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
                        <button
                            onClick={() => {
                                if (cart.length > 0) {
                                    alert('Carrito pagado con éxito');
                                    deleteCart();
                                }
                            }}
                            className={`px-4 py-2 rounded-xl font-semibold text-white ${cart.length > 0
                                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                : "bg-green-600/60 pointer-events-none"}`}
                        >
                            Pagar
                        </button>
                    </div>
                </div>
            </div>
            {openSuggest && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-80 rounded-xl p-4 shadow-lg relative">

                        <button
                            onClick={() => setOpenSuggest(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
                        >
                            ✕
                        </button>

                        <div className="text-sm font-semibold text-center mb-2 text-green-800">Producto actual</div>
                        <div className="border p-2 rounded mb-3">
                            <div className="text-xs font-bold">{suggestData?.current.name}</div>
                            <div className="text-[10px] text-gray-700">
                                💵 {suggestData?.current.price}
                            </div>
                            <div className="text-[10px] text-gray-600">
                                🌱 {suggestData?.current.sustainability.ambiental} |
                                🤝 {suggestData?.current.sustainability.social} |
                                💚 {suggestData?.current.sustainability.economico} |
                                ⭐ {suggestData?.current.score}
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-center mb-2 text-green-700">
                            Alternativas sostenibles
                        </h3>
                        {Array.isArray(suggestData?.suggestions) && suggestData.suggestions.length > 0 ? (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {suggestData.suggestions.map((product) => {
                                    const diff = (product?.price ?? 0) - (suggestData?.current?.price ?? 0);
                                    return (
                                        <div key={product._id} className="border p-2 rounded cursor-pointer" onClick={() => {
                                            removeFromCart(suggestData?.current)
                                            setOpenSuggest(false);
                                            addToCart(product)
                                        }}>
                                            <div className="text-xs font-semibold truncate">{product?.name}</div>
                                            <div className="text-[10px] text-gray-700">
                                                💵 {product?.price}
                                                {Number.isFinite(diff) && (
                                                    <span className={`ml-1 ${diff <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        ({diff <= 0 ? '↓' : '↑'} {Math.abs(diff)} vs actual)
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[10px] text-gray-600">
                                                🌱 {product?.sustainability?.ambiental ?? "-"} |
                                                🤝 {product?.sustainability?.social ?? "-"} |
                                                💚 {product?.sustainability?.economico ?? "-"} |
                                                ⭐ {product?.score ?? "-"}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-xs text-gray-500 py-4">
                                No hay mejores opciones por ahora.
                            </div>
                        )}
                    </div>
                </div>
            )}
            {openOptimize && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-80 rounded-xl p-4 shadow-lg relative">

                        <button
                            onClick={() => setOpenOptimize(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg cursor-pointer"
                        >
                            ✕
                        </button>

                        <h3 className="text-sm font-semibold text-center mb-4 text-green-700">
                            Ingresa tu presupuesto
                        </h3>

                        <input
                            type="number"
                            placeholder="💵 Presupuesto CLP"
                            className="w-full border px-3 py-2 rounded text-sm"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />

                        <button
                            onClick={() => {
                                handleOptimizeCart();
                                setBudget(0)
                                setOpenSuggest(false);
                            }}
                            disabled={isNaN(budget) || Number(budget) <= 0}
                            className={`w-full mt-5 py-2 rounded-lg text-sm font-semibold transition
                                ${isNaN(budget) || Number(budget) <= 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"}
                            `}
                        >
                            Confirmar
                        </button>

                    </div>
                </div>
            )}

        </div>
    )
}

export default CartPage