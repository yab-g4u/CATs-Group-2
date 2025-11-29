import Layout from '../../components/Layout'
import HealthPassGenerator from '../../components/HealthPassGenerator'
import { useTranslation } from '../../utils/i18n'

export default function DemoHP(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-2xl font-bold mb-4">{t('tm3_name')} — Demo</h1>
        <p className="text-gray-600 mb-6">{t('tm3_desc')}</p>
        <HealthPassGenerator />
      </div>
    </Layout>
  )
}
