import { useTranslation } from '../utils/i18n'

export default function LanguageSwitch(){
  const { locale, setLocale, t } = useTranslation()
  return (
    <div className="flex gap-2 justify-center">
      <button onClick={()=>setLocale('en')} className={`px-3 py-1 rounded ${locale==='en'?'bg-blue-600 text-white':'bg-gray-200'}`}>EN</button>
      <button onClick={()=>setLocale('am')} className={`px-3 py-1 rounded ${locale==='am'?'bg-blue-600 text-white':'bg-gray-200'}`}>AM</button>
      <button onClick={()=>setLocale('om')} className={`px-3 py-1 rounded ${locale==='om'?'bg-blue-600 text-white':'bg-gray-200'}`}>OM</button>
      <button onClick={()=>setLocale('ti')} className={`px-3 py-1 rounded ${locale==='ti'?'bg-blue-600 text-white':'bg-gray-200'}`}>TI</button>
    </div>
  )
}
