import React from 'react'
import { useStore } from '../contexts/StoreContext'
import { Link } from 'react-router-dom'

export default function Wishlist(){
  const { state, dispatch } = useStore()

  return (
    <div>
      <h2>Wishlist</h2>
      {state.wishlist.length === 0 ? (
        <div>
          <p>No items in wishlist.</p>
          <Link to="/">Shop now</Link>
        </div>
      ) : (
        <div style={{display:'grid', gap:12}}>
          {state.wishlist.map(item => (
            <div key={item.id} style={{display:'flex', gap:12, alignItems:'center', background:'#fff', padding:12, borderRadius:10}}>
              <img src={item.images[0]} alt={item.title} style={{width:90,height:70,objectFit:'cover',borderRadius:8}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:800}}>{item.title}</div>
                <div className="kicker">${item.price.toFixed(2)}</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <button onClick={()=>{dispatch({type:'ADD_TO_CART', payload:item}); dispatch({type:'SHOW_TOAST', payload:{text:'Added to cart'}})}} className="btn btn-primary">Add to cart</button>
                <button onClick={()=>{dispatch({type:'TOGGLE_WISHLIST', item}); dispatch({type:'SHOW_TOAST', payload:{text:'Removed from wishlist'}})}} className="btn btn-ghost">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
