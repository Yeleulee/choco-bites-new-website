"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 bg-background">
        {/* Contact Header */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 playfair">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Have questions about our products or services? We'd love to hear from you.
              Get in touch with us!
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="luxury-button w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Visit Us</h3>
                        <p className="text-foreground/80">
                          123 Cookie Lane<br />
                          Sweet City, SC 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Call Us</h3>
                        <p className="text-foreground/80">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Email Us</h3>
                        <p className="text-foreground/80">info@chocobites.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">Opening Hours</h3>
                        <p className="text-foreground/80">
                          Monday - Friday: 9:00 AM - 8:00 PM<br />
                          Saturday - Sunday: 10:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-accent rounded-lg p-4 h-[300px] flex items-center justify-center">
                  <p className="text-center text-foreground/80">
                    [Map Component Placeholder]<br />
                    Interactive map will be integrated here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Do you offer delivery?</h3>
                <p className="text-foreground/80">
                  Yes, we offer delivery within a 10-mile radius of our store. Orders must be placed at least 24 hours in advance.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Can I place custom orders?</h3>
                <p className="text-foreground/80">
                  Absolutely! We love creating custom cookie designs. Please contact us at least one week in advance for custom orders.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">What about allergies?</h3>
                <p className="text-foreground/80">
                  We clearly label all allergens and can accommodate some dietary restrictions. Please ask about our options.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">How long do cookies stay fresh?</h3>
                <p className="text-foreground/80">
                  Our cookies stay fresh for up to 5 days when stored in an airtight container at room temperature.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 