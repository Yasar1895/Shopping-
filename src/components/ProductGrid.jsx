import React, { useMemo, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, onQuickView }) {
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('popular')
  const [limit, setLimit] = useState(9)

  const categories = useMemo(()=>['All', ...Array.from(new Set(products.map(p=>p.category)))], [products])

  const filtered = useMemo(() => {
    let res = products
    if (filter !== 'All') res = res.filter(p => p.category === filter)
    if (sort === 'low') res = res.slice().sort((a,b)=>a.price-b.price)
    if (sort === 'high') res = res.slice().sort((a,b)=>b.price-a.price)
    return res
  }, [products, filter, sort])

  return (
    <>
      <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:12}}>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{padding:8,borderRadius:8}}>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{padding:8,borderRadius:8}}>
          <option value="popular">Popular</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        <div style={{marginLeft:'auto', color:'#475569', fontWeight:800}}>{filtered.length} products</div>
      </div>

      <div className="grid">
        {filtered.slice(0,limit).map(p => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}
      </div>

      {limit < filtered.length && (
        <div style={{textAlign:'center', marginTop:18}}>
          <button className="btn btn-primary" onClick={() => setLimit(prev => prev + 9)}>Load more</button>
        </div>
      )}
    </>
  )
}
