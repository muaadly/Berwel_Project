import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Share2, Copy, Facebook, Instagram, MessageCircle } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  songName: string
  singerName: string
  singerImage: string
  currentUrl: string
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  songName, 
  singerName, 
  singerImage, 
  currentUrl 
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareTitle = `${songName} — ${singerName}`
  const shareText = `Check out "${songName}" by ${singerName} on Berwel - A Website for Libyan Music`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      alert('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: currentUrl })
      } catch {
        // user cancelled or error; no-op
      }
    } else {
      // Fallback: copy link
      await handleCopyLink()
      alert('Link copied. Share it in any app you like!')
    }
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleInstagramShare = () => {
    // Instagram doesn't support direct URL sharing from web – use native share / copy fallback
    if (navigator.share) {
      handleNativeShare()
      return
    }
    handleCopyLink()
    alert(`Instagram sharing: Copy the link and share it in your Instagram story or post!\n\nSuggested caption: ${shareText}`)
  }

  const handleWhatsAppShare = () => {
    const text = `${shareText}\n\n${currentUrl}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl font-bold">
            Share This Song
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
                               {/* Song Image Section */}
                     <div className="bg-gray-900 rounded-lg overflow-hidden h-64">
                       <img
                         src={singerImage}
                         alt={singerName}
                         className="w-full h-full object-contain bg-gray-800"
                         onError={(e) => {
                           (e.target as HTMLImageElement).src = '/placeholder-user.jpg'
                         }}
                       />
                     </div>

          {/* Song Info Section */}
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <h3 className="text-white font-bold text-xl mb-1">{songName}</h3>
            <p className="text-gray-300">{singerName}</p>
          </div>

          {/* Share Options */}
          <div className="flex justify-center gap-4">
            {/* Native Share (best for phones) */}
            <Button
              onClick={handleNativeShare}
              className="bg-orange-500 hover:bg-orange-600 text-white p-3 w-12 h-12 rounded-lg flex items-center justify-center"
              title="Share"
            >
              <Share2 className="h-6 w-6" />
            </Button>

            {/* Facebook */}
            <Button
              onClick={handleFacebookShare}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-12 h-12 rounded-lg flex items-center justify-center"
              title="Share on Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Button>

            {/* Instagram */}
            <Button
              onClick={handleInstagramShare}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 w-12 h-12 rounded-lg flex items-center justify-center"
              title="Share on Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Button>

            {/* WhatsApp */}
            <Button
              onClick={handleWhatsAppShare}
              className="bg-green-600 hover:bg-green-700 text-white p-3 w-12 h-12 rounded-lg flex items-center justify-center"
              title="Share on WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>

            {/* Copy Link */}
            <Button
              onClick={handleCopyLink}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 w-12 h-12 rounded-lg flex items-center justify-center"
              title={copied ? 'Copied!' : 'Copy Link'}
            >
              <Copy className="h-6 w-6" />
            </Button>
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 