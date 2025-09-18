import React from 'react'
import { FiX } from 'react-icons/fi'
import { useStore } from '../contexts/StoreContext'
import ImageWithFallback from './ImageWithFallback'

export default function ProductModal({ product, onClose }) {
  const { dispatch } = useStore()
  if (!product) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div>
          <div style={{borderRadius:12, overflow:'hidden'}} className="product-media">
            <ImageWithFallback src={product.images[0]} alt={product.title} />
          </div>
        </div>

        <div style={{position:'relative'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <h3 style={{margin:0}}>{product.title}</h3>
              <div className="kicker">Category: {product.category}</div>
            </div>
            <div style={{cursor:'pointer'}} onClick={onClose}><FiX size={20} /></div>
          </div>

          <p style={{marginTop:12, color:'#1f2937'}}>{product.description}</p>
          <div style={{marginTop:14, fontSize:22, fontWeight:900}}>${product.price.toFixed(2)}</div>

          <div style={{display:'flex', gap:10, marginTop:16}}>
            <button className="btn btn-primary" onClick={() => { dispatch({type:'ADD_TO_CART', payload: product}); dispatch({type:'SHOW_TOAST', payload:{text:`Added ${product.title} to cart`}}); onClose(); }}>Add to Cart</button>
            <button className="btn btn-ghost" onClick={() => { dispatch({type:'TOGGLE_WISHLIST', item: product}); dispatch({type:'SHOW_TOAST', payload:{text:`Wishlist updated`}}) }}>Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
