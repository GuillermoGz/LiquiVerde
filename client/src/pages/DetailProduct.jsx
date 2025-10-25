import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext';
import { useParams } from "react-router-dom";
import { getProducts } from '../api/api';

const DetailProduct = () => {
    const { barcode } = useParams();
    const [product, setProduct] = useState([]);
    const { cart, addToCart, removeFromCart } = useCart()
    const qty = cart.find(item => item._id === product._id)?.qty || 0;
    useEffect(() => {
        async function fetchData() {
            const res = await getProducts(barcode);
            setProduct(res.data.products);
        }
        fetchData();
    }, [barcode]);
    return (
        <div className="max-w-4xl mx-auto p-4 pt-20">
            <div className="grid gap-6 md:grid-cols-2">

                <div className="border rounded-xl p-4">
                    <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="text-gray-500">
                        {product.category} • {product.brand} • {product.weightGrams}g
                    </p>

                    <div className="mt-3 text-3xl font-bold text-green-700">
                        $ {product.price}
                    </div>

                    <div className="mt-4 text-sm space-y-1">
                        <h3 className="font-semibold mt-4 mb-2">Impacto Sostenible</h3>
                        <div>🌱 Cuidado del planeta (Ambiental): <b>{product?.sustainability?.ambiental ?? "-"}</b></div>
                        <div>🤝 Apoyo a las personas (Social): <b>{product?.sustainability?.social ?? "-"}</b></div>
                        <div>💚 Producción responsable (Economico): <b>{product?.sustainability?.economico ?? "-"}</b></div>
                        <div>⭐ Puntaje general: <b>{product.score}</b></div>
                    </div>

                    {qty === 0 ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product)
                            }}
                            className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-green-700 transition cursor-pointer"
                        >
                            Agregar al carro
                        </button>
                    ) : (
                        <div className="mt-2 flex justify-between items-center border rounded-xl px-2 py-2">
                            <button
                                className="bg-red-500 text-white px-3 rounded-lg font-bold cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCart(product)
                                }}
                            >
                                -
                            </button>

                            <span className="font-semibold text-gray-700">{qty}</span>

                            <button
                                className="bg-green-600 text-white px-3 rounded-lg font-bold cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product)
                                }}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;
