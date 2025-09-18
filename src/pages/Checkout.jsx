import React, { useState } from 'react'
import { useStore } from '../contexts/StoreContext'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const { state, dispatch } = useStore()
  const total = state.cart.reduce((s,i)=>s + i.price * i.qty, 0)
  const [form, setForm] = useState({name:'', email:'', address:'', city:'', country:''})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validate() {
    const e = {}
    if (!form.name) e.name = 'Required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.address) e.address = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit(e) {
    e.preventDefault()
    if (!validate()) return
    const order = { id: 'ORD' + Date.now(), items: state.cart, total, customer: form }
    console.log('ORDER', order)
    dispatch({type:'CLEAR_CART'})
    dispatch({type:'SHOW_TOAST', payload:{text:'Order placed (demo)'}})
    navigate('/', {replace:true})
  }

  if (state.cart.length === 0) return <div><h2>Checkout</h2><p>Your cart is empty.</p></div>

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr', gap:18}}>
      <h2>Checkout</h2>
      <form onSubmit={submit} style={{background:'#fff', padding:16, borderRadius:10}}>
        <div style={{display:'grid', gap:10}}>
          <label>Name</label>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="input" />
          {errors.name && <div style={{color:'red'}}>{errors.name}</div>}

          <label>Email</label>
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="input" />
          {errors.email && <div style={{color:'red'}}>{errors.email}</div>}

          <label>Address</label>
          <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} className="input" />
          {errors.address && <div style={{color:'red'}}>{errors.address}</div>}

          <div style={{display:'flex', gap:8}}>
            <div style={{flex:1}}>
              <label>City</label>
              <input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} className="input" />
            </div>
            <div style={{width:180}}>
              <label>Country</label>
              <input value={form.country} onChange={e=>setForm({...form, country:e.target.value})} className="input" />
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
            <div>
              <div className="kicker">Total</div>
              <div style={{fontSize:20, fontWeight:900}}>${total.toFixed(2)}</div>
            </div>
            <button type="submit" className="btn btn-primary">Place order</button>
          </div>
        </div>
      </form>
    </div>
  )
}
