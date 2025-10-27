"use client"

import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useTranslations } from "@/lib/translations"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Music, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import { signOut } from "next-auth/react"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslations()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                {language === 'ar' ? 'غير مسجل دخول' : 'Not Signed In'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {language === 'ar' 
                  ? 'يجب عليك تسجيل الدخول لعرض الملف الشخصي' 
                  : 'You need to sign in to view your profile'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Go to Homepage'}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchValue={searchValue} setSearchValue={setSearchValue} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <div className={`flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="relative">
                <Image
                  src={user.image || "/placeholder-user.jpg"}
                  alt={user.name || "User"}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-border"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-2 border-card">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mb-4">
                  {user.email}
                </CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Music className="h-3 w-3 mr-1" />
                    {language === 'ar' ? 'عضو في برون' : 'Berwel Member'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">0</h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'الأغاني المفضلة' : 'Favorite Songs'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">0</h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'التعليقات' : 'Comments'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {new Date().getFullYear()}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'عضو منذ' : 'Member Since'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sign Out Button */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <Button 
              onClick={() => signOut()}
              variant="destructive" 
              className="w-full"
            >
              {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
