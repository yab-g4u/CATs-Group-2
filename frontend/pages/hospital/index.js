import Layout from '../../components/Layout'
import { useTranslation } from '../../utils/i18n'

export default function Hospital(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t('hospitalPortal')}</h2>
        <div className="inline-block p-6 bg-gray-100 rounded">Stats & referrals (stub)</div>
      </div>
    </Layout>
  )
}
