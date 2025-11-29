import Link from 'next/link'

export default function ProductCard({ product, size = '' }){
  const sizeClass = size ? `product-card--${size}` : ''
  return (
    <div className={`product-card ${sizeClass}`}>
      {/* decorative faint logo behind content */}
      <img src={product.logo} alt="" className="decor" aria-hidden="true" />
      <div className="card-inner">
        <div className="logo-badge">
          <img src={product.logo} alt={product.name} className="h-8 w-8" />
        </div>
        <div className="mt-2">
          <div className="text-xl font-semibold text-white">{product.name}</div>
          <div className="text-sm text-white/90 mt-1">{product.short}</div>
        </div>

        <ul className="mt-4 text-sm text-white/90 features">
          {product.features.map((f,i)=>(<li key={i}>{f}</li>))}
        </ul>

        <div className="mt-6">
          <Link href={`/products/${product.slug}`} className="btn btn-cta">Learn more</Link>
        </div>
      </div>
    </div>
  )
}
