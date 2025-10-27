"use client";
import Navigation from "@/components/navigation";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import { useState } from "react"
import { useTranslations } from "@/lib/translations"
import { useLanguage } from "@/components/language-provider"

export default function ContactPage() {
  const { t } = useTranslations()
  const { language } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <Navigation
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-20">
        <div className="bg-card border-2 border-border rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-primary">
          <h1 className={`text-4xl font-bold mb-6 group-hover:text-primary transition-colors duration-200 ${language === 'ar' ? 'text-center md:text-right' : 'text-center'}`}>
            {language === 'ar' ? t('contactTitle') : 'Contact Us'}
          </h1>
          <p className={`text-lg mb-8 text-foreground ${language === 'ar' ? 'text-right' : 'text-center'}`}>
            {language === 'ar' ? t('contactIntro') : 'Have a question, suggestion, or want to get involved? Fill out the form below and we\'ll get back to you soon.'}
          </p>
          <div className="mt-8">
            <ContactForm hideHeading />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 