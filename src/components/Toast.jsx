import React from 'react'
import { useStore } from '../contexts/StoreContext'

export default function Toast(){
  const { state } = useStore()
  if (!state.toast) return null
  return <div className="toast">{state.toast.text}</div>
}
