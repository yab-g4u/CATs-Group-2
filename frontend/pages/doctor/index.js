import Layout from '../../components/Layout'
import Link from 'next/link'
import { useTranslation } from '../../utils/i18n'

export default function Doctor(){
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">{t('doctorPortal')}</h2>
        <div className="flex gap-3 justify-center">
          <Link href="/doctor/scan" className="px-5 py-3 bg-blue-600 text-white rounded">{t('scanQr')}</Link>
        </div>
      </div>
    </Layout>
  )
}
