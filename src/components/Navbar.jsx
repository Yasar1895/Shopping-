import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useStore } from '../contexts/StoreContext'

export default function Navbar({ onSearch }) {
  const { state } = useStore()
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)
  const wishlistCount = state.wishlist.length
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    onSearch(q)
    navigate('/')
  }

  return (
    <header className="header" role="banner">
      <div className="brand">
        <div className="logo">SH</div>
        <div>
          <div style={{fontSize:18, fontWeight:800}}>ShopHub</div>
          <div style={{fontSize:12, opacity:0.95}}>Colorful electronics</div>
        </div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <form className="search" onSubmit={submit} role="search">
          <FiSearch />
          <input placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} aria-label="Search products" />
        </form>

        <Link to="/wishlist" style={{textDecoration:'none'}} title="Wishlist">
          <div className="badge">♡ {wishlistCount}</div>
        </Link>

        <Link to="/cart" style={{textDecoration:'none'}} title="Cart">
          <div className="badge">🛒 {cartCount}</div>
        </Link>
      </div>
    </header>
  )
}
