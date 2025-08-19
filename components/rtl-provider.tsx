"use client"

import { ReactNode, useEffect } from 'react'
import { useLanguage } from './language-provider'

interface RTLProviderProps {
  children: ReactNode
}

export function RTLProvider({ children }: RTLProviderProps) {
  const { language } = useLanguage()

  useEffect(() => {
    // Set the document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Add RTL-specific CSS classes
    if (language === 'ar') {
      document.documentElement.classList.add('rtl')
    } else {
      document.documentElement.classList.remove('rtl')
    }
  }, [language])

  return <>{children}</>
}
