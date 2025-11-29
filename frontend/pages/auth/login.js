import { useState } from 'react'
import Layout from '../../components/Layout'
import { requestOtp } from '../../services/auth'
import { useTranslation } from '../../utils/i18n'

export default function Login() {
  const { t } = useTranslation()
  const [identifier, setIdentifier] = useState('')

  const handleRequest = async (e) => {
    e.preventDefault()
    // UI only; real hook in services/auth
    await requestOtp({ identifier })
    alert(t('otpRequested'))
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">{t('loginTitle')}</h2>
        <form onSubmit={handleRequest} className="space-y-4">
          <input value={identifier} onChange={(e)=>setIdentifier(e.target.value)} placeholder={t('phoneOrId')} className="w-full p-3 border rounded" />
          <button className="w-full p-3 bg-blue-600 text-white rounded">{t('requestCode')}</button>
        </form>
      </div>
    </Layout>
  )
}
