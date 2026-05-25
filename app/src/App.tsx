import { Routes, Route } from 'react-router';
import BackgroundEngine from '@/components/BackgroundEngine';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Assessment from '@/pages/Assessment';
import Results from '@/pages/Results';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Boutique from '@/pages/Boutique';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Auth from '@/pages/Auth';
import Account from '@/pages/Account';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <>
      <BackgroundEngine />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
