import Link from 'next/link'
import Layout from '../components/Layout'
import LanguageSwitch from '../components/LanguageSwitch'
import { useTranslation } from '../utils/i18n'
import ProductCard from '../components/ProductCard'
import FeatureBlock from '../components/FeatureBlock'

export default function Home() {
  const { t } = useTranslation()
  return (
    <Layout>
  <div className="max-w-5xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">{t('appName')}</h1>
        <p className="text-lg text-gray-600 mb-8">{t('tagline')}</p>

        <div className="flex gap-4 justify-center mb-6">
          <Link href="/patient" className="px-6 py-3 bg-blue-600 text-white rounded-lg">{t('patientButton')}</Link>
          <Link href="/doctor" className="px-6 py-3 bg-green-600 text-white rounded-lg">{t('doctorButton')}</Link>
          <Link href="/hospital" className="px-6 py-3 bg-gray-700 text-white rounded-lg">{t('hospitalButton')}</Link>
        </div>

        <LanguageSwitch />
      
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">{t('productsHeading')}</h2>
          <div className="product-grid">
            {/** Use ProductCard if available with staggered sizes */}
            <ProductCard size="large" product={{ slug: 'equimatch', name: t('tm1_name'), short: t('tm1_desc'), features: ['Smart matching engine','Risk-aligned suggestions','Real-time alerts'], logo: '/logos/equimatch.svg' }} />
            <ProductCard size="tall" product={{ slug: 'claimcraft', name: t('tm2_name'), short: t('tm2_desc'), features: ['AI bill scanner','Legal-ready PDF letters','One-click print/download'], logo: '/logos/claimcraft.svg' }} />
            <ProductCard product={{ slug: 'healthpass', name: t('tm3_name'), short: t('tm3_desc'), features: ['Encrypted QR identity','Wallet & phone compatible','Instant patient timeline access'], logo: '/logos/healthpass.svg' }} />
          </div>
        </section>

        <section className="mt-12 text-left">
          <h3 className="text-2xl font-semibold mb-4">{t('howHeading')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureBlock color="#06b6d4" icon={`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' stroke-width='1.5'><path d='M3 7h18M3 12h18M3 17h18'/></svg>`} title={t('howStep1_title')} desc={t('howStep1_desc')} />
            <FeatureBlock color="#7c3aed" icon={`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' stroke-width='1.5'><circle cx='12' cy='8' r='3'/><path d='M6 20c1-4 11-4 12 0'/></svg>`} title={t('howStep2_title')} desc={t('howStep2_desc')} />
            <FeatureBlock color="#ef4444" icon={`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' stroke-width='1.5'><path d='M12 2v20M2 12h20'/></svg>`} title={t('howStep3_title')} desc={t('howStep3_desc')} />
          </div>

          <div className="mt-6 flex gap-3">
            <a href="/demo/claimcraft" className="btn btn-primary">{t('cta_demo_claim')}</a>
            <a href="/demo/healthpass" className="btn btn-primary">{t('cta_demo_health')}</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
