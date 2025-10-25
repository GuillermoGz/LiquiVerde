import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import DetailProduct from './pages/DetailProduct'
import NotFound404 from './pages/NotFound404'
import { CartProvider } from './context/cartContext'
import { useState } from 'react'
import CartDrawer from './components/CartDrawer'
import CartPage from './pages/CartPage'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <BrowserRouter>
      <CartProvider>
        <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Carrito" />
        <Routes>

          <Route element={<Layout setDrawerOpen={setDrawerOpen} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail-product/:barcode" element={<DetailProduct />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          <Route path="*" element={<NotFound404 />} />

        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
