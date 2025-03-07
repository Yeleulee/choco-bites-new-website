import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 bg-background">
        {/* Hero Section */}
        <section className="relative h-[400px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/brownies.jpg"
              alt="Our bakery"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white playfair">Our Story</h1>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 playfair">A Sweet Journey</h2>
              <p className="text-lg mb-8 text-foreground/80">
                Founded in 2020, c_hoco_bites began with a simple passion: creating the perfect cookie. 
                What started as weekend baking sessions in a small kitchen has grown into a beloved 
                destination for cookie enthusiasts across the city.
              </p>
              <p className="text-lg mb-8 text-foreground/80">
                Our commitment to quality ingredients and traditional baking methods has never wavered. 
                Each cookie is handcrafted with premium chocolate, fresh butter, and a sprinkle of love.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 playfair">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Quality First</h3>
                <p className="text-foreground/80">
                  We use only the finest ingredients, sourced from trusted suppliers who share our commitment to excellence.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Handcrafted Care</h3>
                <p className="text-foreground/80">
                  Every cookie is made by hand, ensuring the perfect texture and taste that machine-made products can't match.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-xl font-bold mb-4">Community Focus</h3>
                <p className="text-foreground/80">
                  We're more than a bakery - we're part of your community, creating sweet moments for every occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 playfair">Ready to Experience Our Cookies?</h2>
            <p className="text-lg mb-8">Join us for a taste of happiness in every bite.</p>
            <Link href="/menu">
              <Button className="luxury-button" size="lg">
                View Our Menu
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}