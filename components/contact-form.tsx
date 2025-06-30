"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactForm({ hideHeading = false }: { hideHeading?: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {!hideHeading && (
          <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>
        )}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg px-8 pt-8 pb-4 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-gray-900 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div className="bg-black border border-gray-700 rounded-lg p-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-gray-900 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
