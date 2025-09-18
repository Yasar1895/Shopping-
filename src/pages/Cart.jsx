import React from 'react'
import { useStore } from '../contexts/StoreContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const total = state.cart.reduce((s,i)=>s + i.price * i.qty, 0)

  return (
    <div>
      <h2>Cart</h2>
      {state.cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        <>
          <div style={{display:'grid', gap:12}}>
            {state.cart.map(item => (
              <div key={item.id} style={{display:'flex', gap:12, alignItems:'center', background:'#fff', padding:12, borderRadius:10}}>
                <img src={item.images[0]} alt={item.title} style={{width:100,height:80,objectFit:'cover',borderRadius:8}} />
                <div style={{flex:1}}>
                  <div style={{fontWeight:800}}>{item.title}</div>
                  <div className="kicker">${item.price.toFixed(2)}</div>
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <button onClick={()=>dispatch({type:'UPDATE_QTY', id:item.id, qty: item.qty - 1})} className="btn btn-ghost">-</button>
                  <div style={{minWidth:36,textAlign:'center', fontWeight:800}}>{item.qty}</div>
                  <button onClick={()=>dispatch({type:'UPDATE_QTY', id:item.id, qty: item.qty + 1})} className="btn btn-ghost">+</button>
                  <button onClick={()=>{dispatch({type:'REMOVE_FROM_CART', id: item.id}); dispatch({type:'SHOW_TOAST', payload:{text:'Item removed'}})}} className="btn btn-ghost">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div className="kicker">Subtotal</div>
              <div style={{fontSize:22, fontWeight:900}}>${total.toFixed(2)}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-ghost" onClick={()=>{dispatch({type:'CLEAR_CART'}); dispatch({type:'SHOW_TOAST', payload:{text:'Cart cleared'}})}}>Clear</button>
              <button className="btn btn-primary" onClick={()=> navigate('/checkout')}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
