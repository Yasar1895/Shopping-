import React, { useState, useEffect, useRef } from 'react'

export default function ImageWithFallback({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => { setLoaded(false); setError(false) }, [src])

  return (
    <div style={{width:'100%', height:'100%', position:'relative', ...style}} className={className}>
      {!loaded && !error && <div className="skeleton" />}
      <img
        ref={imgRef}
        src={error ? '/placeholder.png' : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
          display: loaded || error ? 'block' : 'none'
        }}
        loading="lazy"
      />
    </div>
  )
}
