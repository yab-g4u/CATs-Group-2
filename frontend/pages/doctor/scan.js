import Layout from '../../components/Layout'
import { useTranslation } from '../../utils/i18n'

export default function Scan(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t('scanQr')}</h2>
        <div className="inline-block p-8 bg-gray-100 rounded">QR SCANNER (camera)</div>
      </div>
    </Layout>
  )
}
