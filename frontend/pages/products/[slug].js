import Layout from '../../components/Layout'
import products from '../../data/products'
import { useRouter } from 'next/router'
import { useTranslation } from '../../utils/i18n'

export default function ProductPage(){
  const router = useRouter()
  const { slug } = router.query
  const product = products.find(p => p.slug === slug) || products[0]
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <div className="flex items-center gap-4">
          <img src={product.logo} alt={product.name} className="h-14 w-14" />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-600">{product.short}</p>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Key features</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {product.features.map((f,i)=>(<li key={i}>{f}</li>))}
          </ul>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-2">How it works</h3>
          <p className="text-gray-700">{t('tm_work_intro') || 'Simple, private and secure — designed for Ethiopia.'}</p>
        </section>

        <div className="mt-8">
          <a className="px-4 py-2 bg-green-600 text-white rounded" href="#">Request demo</a>
        </div>
      </div>
    </Layout>
  )
}
