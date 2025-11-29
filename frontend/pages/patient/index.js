import Layout from '../../components/Layout'
import { useApp } from '../../services/store'
import Link from 'next/link'
import { useTranslation } from '../../utils/i18n'

export default function Patient(){
  const { profile } = useApp()
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="mb-6">
          <div className="inline-block p-6 bg-gray-100 rounded-lg">QR CODE</div>
        </div>
        <h2 className="text-2xl font-semibold">{profile?.name || t('patientName')}</h2>
        <p className="text-sm text-gray-500">{t('healthId')}: XXXXX-XXXX</p>

        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/patient/history" className="px-5 py-3 bg-blue-600 text-white rounded">{t('viewHistory')}</Link>
          <Link href="/patient/referrals" className="px-5 py-3 bg-gray-200 rounded">{t('myReferrals')}</Link>
        </div>
      </div>
    </Layout>
  )
}
