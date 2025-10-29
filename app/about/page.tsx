"use client";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer"
import { useState } from "react"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "@/components/language-provider"

export default function AboutPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { t } = useTranslations()
  const { language } = useLanguage()
  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="max-w-3xl mx-auto px-4 pt-16 space-y-8 pb-20">
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h1 className="text-4xl font-bold mb-6 text-center group-hover:text-primary transition-colors duration-200">{t('aboutTitle')}</h1>
          <p className="text-lg mb-4 text-center text-foreground">
            {t('aboutDescription')}
          </p>

        </div>
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h2 className={`text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>{t('projectTitle')}</h2>
          <p className={`mb-4 text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>
            {t('projectDescription')}
          </p>
          <p className={`mb-0 text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>
            {t('projectMission')}
          </p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h2 className={`text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>{t('libraryTitle')}</h2>
          <div className="mb-0 text-foreground space-y-2">
            {t('libraryItems').map((item, index) => (
              <p key={index} className={`text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>{item}</p>
            ))}
          </div>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h2 className={`text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>{t('contributeTitle')}</h2>
          <p className={`mb-4 text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>
            {t('contributeDescription')}
          </p>
          <div className="mb-4 text-foreground space-y-4">
            {t('contributeItems').map((item, index) => (
              <p key={index} className={`text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>{item}</p>
            ))}
          </div>
          <p className={`mb-0 text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>
            {t('contributeEnd')}
          </p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h2 className={`text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>{t('whyMattersTitle')}</h2>
          <p className={`mb-4 text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>
            {t('whyMattersDescription')}
          </p>
          <p className={`mb-0 text-foreground ${language === 'ar' ? 'text-left md:text-right' : 'text-left'}`}>
            {t('whyMattersEnd')}
          </p>
        </div>
        {/* GoFundMe Section */}
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-200">{t('supportTitle')}</h2>
          <p className="mb-6 text-foreground">{t('supportDescription')}</p>
          <div className="text-center">
            <a
              href="https://www.gofundme.com/f/documenting-metadata-of-traditional-libyan-music?utm_campaign=p_cp+share-sheet&utm_medium=copy_link_all&utm_source=customer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold text-lg shadow-lg transition-colors duration-200"
            >
              {t('donateButton')}
            </a>
          </div>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h3 className="text-2xl font-bold mb-4 text-foreground">{t('sponsorsTitle')}</h3>
          <div className="mb-6 text-foreground">
            {t('sponsorsDescription')}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg h-40 md:h-48 w-full transition-colors duration-200 hover:border-2 hover:border-orange-500 hover:bg-orange-950 group focus:outline-none focus:ring-2 focus:ring-orange-500">
                <a href="https://www.lhos.ly/" target="_blank" rel="noopener noreferrer">
                  <img src="/Partners Logos/Libyan Houes.png" alt="Libyan House for Oud Studies" className="max-h-28 md:max-h-36 w-auto object-contain mx-auto" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg h-40 md:h-48 w-full transition-colors duration-200 hover:border-2 hover:border-orange-500 hover:bg-orange-950 group focus:outline-none focus:ring-2 focus:ring-orange-500">
                <a href="https://boursa.io/en" target="_blank" rel="noopener noreferrer">
                  <img src="/Partners Logos/Boursa AII.png" alt="Boursa" className="max-h-36 md:max-h-44 w-auto object-contain mx-auto" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg h-40 md:h-48 w-full transition-colors duration-200 hover:border-2 hover:border-orange-500 hover:bg-orange-950 group focus:outline-none focus:ring-2 focus:ring-orange-500">
                <a href="https://www.alfadaia.com/" target="_blank" rel="noopener noreferrer">
                  <img src="/Partners Logos/Alfadaia ai.png" alt="Alfadaia AI" className="max-h-36 md:max-h-44 w-auto object-contain mx-auto" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg h-40 md:h-48 w-full transition-colors duration-200 hover:border-2 hover:border-orange-500 hover:bg-orange-950 group focus:outline-none focus:ring-2 focus:ring-orange-500">
                <a href="https://csmedia.ly" target="_blank" rel="noopener noreferrer">
                  <img src="/images/Creative_Solution_Logo.png" alt="Creative Solution" className="max-h-36 md:max-h-44 w-auto object-contain mx-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 