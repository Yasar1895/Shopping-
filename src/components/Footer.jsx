import React from 'react'
export default function Footer(){
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} ShopHub — modern frontend-only demo</div>
      <div style={{marginTop:6, fontSize:13, color:'#6b7280'}}>No backend — demo checkout (client-side only)</div>
    </footer>
  )
}
