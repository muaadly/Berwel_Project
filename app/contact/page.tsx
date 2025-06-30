"use client";
import Navigation from "@/components/navigation";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-16">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-20">
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 shadow-lg transition-colors duration-200 group hover:border-orange-500">
          <h1 className="text-4xl font-bold mb-6 text-center group-hover:text-orange-500 transition-colors duration-200">Contact Us</h1>
          <p className="text-lg mb-8 text-center text-white">
            Have a question, suggestion, or want to get involved? Fill out the form below and we'll get back to you soon.
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