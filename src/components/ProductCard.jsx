import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext'
import ImageWithFallback from './ImageWithFallback'
import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function ProductCard({ product, onQuickView }) {
  const { state, dispatch } = useStore()
  const inWishlist = state.wishlist.some(i => i.id === product.id)

  return (
    <motion.article className="card" layout whileHover={{ scale: 1.01 }} initial={{opacity:0, y:8}} animate={{opacity:1,y:0}}>
      <div className="meta">
        <div className="kicker">{product.category}</div>
        <div className="stars">★ {product.rating.toFixed(1)}</div>
      </div>

      <div className="product-media" aria-hidden>
        <ImageWithFallback src={product.images[0]} alt={product.title} />
      </div>

      <div>
        <div className="title">{product.title}</div>
        <div className="desc">{product.description.slice(0,100)}{product.description.length>100? '...' : ''}</div>

        <div className="row">
          <div>
            <div className="price">${product.price.toFixed(2)}</div>
            {product.mrp && <div className="old">${product.mrp.toFixed(2)}</div>}
          </div>

          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <button
              className="btn btn-primary"
              onClick={() => { dispatch({type:'ADD_TO_CART', payload: product}); dispatch({type:'SHOW_TOAST', payload:{text:`Added ${product.title} to cart`}}) }}
            >
              Add
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => { dispatch({type:'TOGGLE_WISHLIST', item: product}); dispatch({type:'SHOW_TOAST', payload:{text: inWishlist ? `Removed ${product.title} from wishlist` : `Saved ${product.title}` }}) }}
              aria-pressed={inWishlist}
              title={inWishlist? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart style={{marginRight:6}} /> {inWishlist ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <div style={{display:'flex', marginTop:12, gap:8}}>
          <Link to={`/product/${product.id}`} style={{textDecoration:'none'}}>
            <button className="btn btn-ghost">View</button>
          </Link>

          <button className="btn btn-ghost" onClick={() => onQuickView(product)}>Quick View</button>
        </div>
      </div>
    </motion.article>
  )
}
