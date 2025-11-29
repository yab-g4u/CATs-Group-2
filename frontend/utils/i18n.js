import React, { createContext, useContext, useState } from 'react'
import en from '../locales/en.json'
import am from '../locales/am.json'
import om from '../locales/om.json'
import ti from '../locales/ti.json'

const translations = { en, am, om, ti }
const I18nCtx = createContext(null)

export function I18nProvider({ children }){
  const [locale, setLocale] = useState('en')
  const t = (key)=> translations[locale]?.[key] || translations['en'][key] || key
  return <I18nCtx.Provider value={{ locale, setLocale, t }}>{children}</I18nCtx.Provider>
}

export function useTranslation(){
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useTranslation must be inside I18nProvider')
  return { locale: ctx.locale, setLocale: ctx.setLocale, t: ctx.t }
}

export { I18nCtx }
