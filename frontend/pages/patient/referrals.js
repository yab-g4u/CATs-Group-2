import Layout from '../../components/Layout'
import { useTranslation } from '../../utils/i18n'

export default function Referrals(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">{t('referrals')}</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">City Hospital</div>
              <div className="text-sm text-gray-500">2025-11-01</div>
            </div>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">{t('view')}</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
