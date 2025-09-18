import React, { useState } from 'react'
import products from '../data/products'
import ProductGrid from '../components/ProductGrid'
import ProductModal from '../components/ProductModal'
import Toast from '../components/Toast'

export default function Home({ searchQuery }) {
  const [quick, setQuick] = useState(null)
  const filtered = products.filter(p => p.title.toLowerCase().includes((searchQuery||'').toLowerCase()))
  return (
    <div>
      <h2 style={{marginTop:0}}>Featured Products</h2>
      <ProductGrid products={filtered} onQuickView={p=>setQuick(p)} />
      <ProductModal product={quick} onClose={()=>setQuick(null)} />
      <Toast />
    </div>
  )
}
