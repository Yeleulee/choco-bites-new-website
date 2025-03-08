"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { menuItems } from '@/lib/menu-data';
import { OrderButton } from '@/components/ui/order-button';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const weeklyMenu = menuItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.defaultMuted = true;
      videoElement.muted = true;
      
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        videoElement.play().catch(error => {
          console.error('Error playing video:', error);
        });
      };

      const handleError = (error: ErrorEvent) => {
        console.error('Video error:', error);
        setIsVideoLoaded(false);
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);

      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
          {/* Left Section – Logo */}
          <a href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="object-contain"
              priority
            />
          </a>
  
          {/* Right Section – Dark Mode Toggle, Cart, and Menu Button */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
            {/* Always visible Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>
  
      {/* Mobile Menu Modal (centered, not full-screen) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-background p-8 rounded-md w-11/12 max-w-md relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="h-6 w-6" />
              </Button>
              {/* Menu Items */}
              <nav className="space-y-6 text-center">
                <Link
                  href="/"
                  className="block text-2xl font-semibold hover:text-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home 🏠
                </Link>
                <Link
                  href="/menu"
                  className="block text-2xl font-semibold hover:text-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu 🍪
                </Link>
                <Link
                  href="/menu?category=special-packs"
                  className="block text-2xl font-semibold hover:text-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Special Packs 🎁
                </Link>
                <Link
                  href="/about"
                  className="block text-2xl font-semibold hover:text-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us 📖
                </Link>
                <Link
                  href="/contact"
                  className="block text-2xl font-semibold hover:text-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact 📞
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute w-full h-full object-cover"
            poster="/images/1KG CHOLATE CHIPS.jpg"
          >
            <source src="/videos/glaze.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback Image - shown during load or on error */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundImage: `url('/images/1KG CHOLATE CHIPS.jpg')` }}
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full bg-gradient-to-b from-black/30 via-black/25 to-black/40 backdrop-blur-[3px]">
          <div className="text-center text-white p-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="playfair text-5xl md:text-7xl font-bold mb-6"
            >
              Freshly Baked
              <br />
              Artisanal Cookies
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              Handcrafted with love, baked to perfection. Experience the magic of homemade cookies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center"
            >
              <OrderButton size="lg" className="luxury-button" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Menu</h2>
          <p className="text-lg text-center text-foreground/80 mb-12">Discover our handcrafted selection of treats</p>
          
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Cookies Category */}
            <Link href="/menu?category=cookies">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src="/images/1KG CHOLATE CHIPS.jpg"
                    alt="Cookies"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <h3 className="text-3xl font-bold text-white">Cookies</h3>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Brownies Category */}
            <Link href="/menu?category=brownies">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src="/images/brownies.jpg"
                    alt="Brownies"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <h3 className="text-3xl font-bold text-white">Brownies</h3>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Special Packs Category */}
            <Link href="/menu?category=special-packs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img 
                    src="/images/1kg ch.jpg"
                    alt="Special Packs"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <h3 className="text-3xl font-bold text-white">Special Packs</h3>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Featured Products */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-foreground/80">Our most loved treats</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.slice(0, 4).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/menu/${product.id}`} className="block">
                  <div className="relative h-48">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <OrderButton size="sm" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button className="luxury-button" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Special Offer</h2>
              <p className="text-xl">Get our 1kg Chocolate Chip Special Pack</p>
              <div className="space-y-4">
                <p className="text-3xl font-bold">$24.99</p>
                <p className="text-foreground/80">Perfect for parties and events</p>
              </div>
              <OrderButton size="lg" className="luxury-button" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <img 
                src="/images/1kg ch.jpg"
                alt="Special Offer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Finder */}
      <section id="locations" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Find a Store</h2>
            <p className="text-lg text-foreground/80">Fresh baked goods at a location near you</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-4 bg-accent rounded-lg p-4">
              <MapPin className="h-6 w-6 text-secondary" />
              <input
                type="text"
                placeholder="Enter your zip code"
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
              <Button className="luxury-button">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-heading">Join Our Sweet Community</h2>
            <p className="mb-8 text-lg">Sign up for exclusive offers and be the first to know about new flavors!</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-primary-foreground text-primary"
              />
              <Button className="luxury-button">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="playfair text-xl font-bold mb-4">c_hoco_bites</h3>
              <p className="text-sm opacity-80">
                Crafting moments of pure delight.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Menu</h4>
              <ul className="space-y-2">
                <li>This Week's Flavors</li>
                <li>Catering</li>
                <li>Gift Cards</li>
                <li>Rewards</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Franchising</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-secondary transition-colors">Instagram</a>
                <a href="#" className="hover:text-secondary transition-colors">Facebook</a>
                <a href="#" className="hover:text-secondary transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}