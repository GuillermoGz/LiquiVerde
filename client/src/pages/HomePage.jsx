import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { cart, addToCart, removeFromCart } = useCart()
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const res = await getProducts();
            setProducts(res.data.products);
        }
        fetchData();
    }, []);
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 pt-20">
            {products.map((product) => {
                const qty = cart.find(item => item._id === product._id)?.qty || 0;

                return (
                    <div key={product._id} className="group border border-green-600 p-4 rounded-lg cursor-pointer " onClick={() => navigate(`/detail-product/${product.barcode}`)}>
                        <img src={product.img} alt={product.name} className="max-h-40 w-auto mx-auto" />
                        <div className="font-medium truncate">$ {product.price}</div>
                        <div className="text-xs text-gray-500 truncate">{product.category} - {product.brand}</div>
                        <div className="text-sm font-medium truncate group-hover:underline">{product.name}</div>

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
                );
            })}
        </div >
    );
};

export default HomePage;
