import React from 'react'
import { useParams } from 'react-router-dom'
import products from '../data/products'
import { useStore } from '../contexts/StoreContext'
import ImageWithFallback from '../components/ImageWithFallback'

export default function ProductDetail(){
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { dispatch } = useStore()

  if (!product) return <div>Product not found</div>

  return (
    <div style={{display:'grid', gridTemplateColumns: '1fr', gap:18}}>
      <div style={{display:'flex', gap:18, flexDirection:'column'}}>
        <div style={{borderRadius:12, overflow:'hidden'}} className="product-media">
          <ImageWithFallback src={product.images[0]} alt={product.title} />
        </div>

        <div style={{display:'flex', gap:12}}>
          <button className="btn btn-primary" onClick={()=>{ dispatch({type:'ADD_TO_CART', payload:product}); dispatch({type:'SHOW_TOAST', payload:{text:`Added ${product.title} to cart`}}) }}>Add to Cart</button>
          <button className="btn btn-ghost" onClick={()=>{ dispatch({type:'TOGGLE_WISHLIST', item:product}); dispatch({type:'SHOW_TOAST', payload:{text:'Wishlist updated'}}) }}>Wishlist</button>
        </div>
      </div>

      <div>
        <h1 style={{marginTop:0}}>{product.title}</h1>
        <div className="kicker">Category: {product.category} • Rating: {product.rating}</div>
        <div style={{fontSize:22, fontWeight:900, marginTop:12}}>${product.price.toFixed(2)}</div>
        <p style={{marginTop:12}}>{product.description}</p>
      </div>
    </div>
  )
}
