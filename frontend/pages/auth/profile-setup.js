import { useState } from 'react'
import Layout from '../../components/Layout'
import { useApp } from '../../services/store'
import { useTranslation } from '../../utils/i18n'

export default function ProfileSetup(){
  const { t } = useTranslation()
  const { setProfile } = useApp()
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('en')
  const [emergency, setEmergency] = useState('')
  const [elderly, setElderly] = useState(false)

  const save = ()=>{
    setProfile({ name, language, emergency, elderly })
    alert(t('profileSaved'))
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12 space-y-4">
        <h2 className="text-2xl font-semibold">{t('profileSetup')}</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder={t('name')} className="w-full p-3 border rounded" />
        <select value={language} onChange={e=>setLanguage(e.target.value)} className="w-full p-3 border rounded">
          <option value="en">English</option>
          <option value="am">Amharic</option>
          <option value="om">Afaan Oromo</option>
          <option value="ti">Tigrinya</option>
        </select>
        <input value={emergency} onChange={e=>setEmergency(e.target.value)} placeholder={t('emergencyContact')} className="w-full p-3 border rounded" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={elderly} onChange={e=>setElderly(e.target.checked)} /> {t('elderlyMode')}</label>
        <button onClick={save} className="w-full p-3 bg-green-600 text-white rounded">{t('save')}</button>
      </div>
    </Layout>
  )
}
