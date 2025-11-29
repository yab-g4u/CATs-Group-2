import Layout from '../../components/Layout'
import products from '../../data/products'
import ProductCard from '../../components/ProductCard'
import { useTranslation } from '../../utils/i18n'

export default function Products(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">{t('productsHeading')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </Layout>
  )
}
