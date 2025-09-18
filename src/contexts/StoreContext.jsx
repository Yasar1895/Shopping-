import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { save, load } from '../utils/storage'

const StoreContext = createContext()
export const useStore = () => useContext(StoreContext)

const initialState = {
  cart: load('cart', []),
  wishlist: load('wishlist', []),
  toast: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload
      const exists = state.cart.find(i => i.id === item.id)
      const cart = exists
        ? state.cart.map(i => i.id === item.id ? { ...i, qty: i.qty + (action.qty || 1) } : i)
        : [...state.cart, { ...item, qty: action.qty || 1 }]
      return { ...state, cart }
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY':
      return { ...state, cart: state.cart.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i) }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.find(i => i.id === action.item.id)
      const wishlist = exists ? state.wishlist.filter(i => i.id !== action.item.id) : [...state.wishlist, action.item]
      return { ...state, wishlist }
    }
    case 'SHOW_TOAST':
      return { ...state, toast: action.payload }
    case 'HIDE_TOAST':
      return { ...state, toast: null }
    default: return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => save('cart', state.cart), [state.cart])
  useEffect(() => save('wishlist', state.wishlist), [state.wishlist])

  useEffect(() => {
    if (state.toast) {
      const t = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000)
      return () => clearTimeout(t)
    }
  }, [state.toast])

  const value = { state, dispatch }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
