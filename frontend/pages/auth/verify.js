import { useState } from 'react'
import Layout from '../../components/Layout'
import { verifyOtp } from '../../services/auth'
import { useTranslation } from '../../utils/i18n'

export default function Verify() {
  const { t } = useTranslation()
  const [code, setCode] = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    await verifyOtp({ code })
    alert(t('verified'))
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">{t('verifyTitle')}</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder={t('enterOtp')} className="w-full p-3 border rounded" />
          <button className="w-full p-3 bg-blue-600 text-white rounded">{t('continue')}</button>
        </form>
      </div>
    </Layout>
  )
}
