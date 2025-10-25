import React, { useState } from "react";
import Logo from '../assets/LiquiVerdeLogo.png';
import { Link } from "react-router-dom";
import { getProducts } from "../api/api";
import { useCart } from "../context/cartContext";

const NavBar = ({ onOpenCart }) => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { cart } = useCart();
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    const handleSearch = async (text) => {
        setSearch(text)
        try {
            if (text.length > 3) {
                const res = await getProducts(text);
                setProducts(res.data.products);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className="w-full bg-white/90 backdrop-blur border-b fixed">
            <nav className="mx-auto px-4 h-16 flex items-center justify-between gap-3">

                <Link to="/" className="shrink-0">
                    <img src={Logo} alt="LiquiVerde" className="h-10 w-auto" />
                </Link>

                <div className="hidden md:block flex-1 max-w-xl mx-auto relative">
                    <label htmlFor="search-desktop" className="sr-only">Buscar productos</label>
                    <input
                        id="search-desktop"
                        type="search"
                        placeholder="Buscar productos…"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {products.length > 0 && (
                        <div className="w-full absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {products.map((product) => (
                                <Link
                                    key={product._id}
                                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex"
                                    to={`/detail-product/${product.barcode}`}
                                    onClick={() => { setProducts([]), setSearch('') }}
                                >
                                    <img src={product.img} alt={product.name} className="max-h-18 w-auto mr-1" />
                                    <div>
                                        <div>{product.name}</div>
                                        <div className="text-sm font-medium truncate">{product.barcode}</div>
                                        <div className="text-xs text-gray-500 truncate">{product.category} - {product.brand}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    {products.length == 0 && search.length > 3 && (
                        <div className="w-full absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            <div className="px-4 py-2">
                                <div className="text-sm font-medium truncate">Producto no encontrado</div>
                            </div>
                        </div>
                    )}

                </div>

                <div className="flex items-center gap-1">

                    <button
                        className="p-2 rounded-xl hover:bg-gray-100 md:hidden"
                        aria-label="Buscar"
                        onClick={
                            () => {
                                setMobileSearchOpen((value) => !value)
                                setSearch('')
                                setProducts([])
                            }
                        }
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                        </svg>
                    </button>

                    <button className="relative p-2 rounded-xl hover:bg-gray-100 cursor-pointer" aria-label="Carrito" onClick={onOpenCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" className="w-6 h-6">
                            <path d="M3 3h2l.4 2M7 13h9l3-7H6.4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="9" cy="21" r="1.8" />
                            <circle cx="18" cy="21" r="1.8" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 text-xs bg-green-600 text-white rounded-full px-1.5 py-0.5">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {mobileSearchOpen && (
                <>
                    <div className="px-4 pb-3 md:hidden">
                        <div div className="relative">
                            <label htmlFor="search-mobile" className="sr-only">Buscar productos</label>
                            <input
                                id="search-mobile"
                                type="search"
                                placeholder="Buscar productos…"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                                autoFocus
                            />
                            {products.length > 0 && (
                                <div className="w-full absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {products.map((product) => (
                                        <Link
                                            key={product._id}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex"
                                            to={`/detail-product/${product.barcode}`}
                                            onClick={() => { setProducts([]), setSearch('') }}
                                        >
                                            <img src={product.img} alt={product.name} className="max-h-18 w-auto mr-1" />
                                            <div>
                                                <div>{product.name}</div>
                                                <div className="text-sm font-medium truncate">{product.barcode}</div>
                                                <div className="text-xs text-gray-500 truncate">{product.category} - {product.brand}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {products.length == 0 && search.length > 3 && (
                                <div className="w-full absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    <div className="px-4 py-2">
                                        <div className="text-sm font-medium truncate">Producto no encontrado</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default NavBar;
