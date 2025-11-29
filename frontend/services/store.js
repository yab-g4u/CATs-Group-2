import { createContext, useContext, useState } from 'react'

const AppCtx = createContext(null)

export function AppProvider({ children }){
  const [profile, setProfile] = useState(null)
  return (
    <AppCtx.Provider value={{ profile, setProfile }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp(){
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

// backwards compatibility for _app import
export const useAppContext = useApp
