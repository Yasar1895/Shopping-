import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'

export default function App(){
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="app">
      <Navbar onSearch={q => setSearchQuery(q)} />
      <main style={{marginTop:14}}>
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
