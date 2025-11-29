import Layout from '../../components/Layout'
import { useTranslation } from '../../utils/i18n'

export default function History(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-6">{t('personalTimeline')}</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded shadow-sm">
            <div className="text-sm text-gray-500">2025-11-30</div>
            <div className="font-medium">{t('visitTitle')}</div>
            <div className="text-sm text-gray-600">Dr. Example — {t('visitSummary')}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
