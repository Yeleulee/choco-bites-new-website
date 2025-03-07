"use client"

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/menu-data';
import { InstagramOrderButton } from '@/components/ui/instagram-order-button';
import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, ArrowUp, ChevronRight, Cookie } from 'lucide-react';
import { InstagramFeed } from '@/components/ui/instagram-feed';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Scroll handler for back to top button and sticky header
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get unique categories and sort them with counts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
    return ['all', ...uniqueCategories].map(category => {
      const count = category === 'all' 
        ? menuItems.length 
        : menuItems.filter(item => item.category === category).length;
      return {
        id: category,
        label: category === 'all' ? 'All Items' : 
               category === 'special-packs' ? 'Special Packs' :
               category.charAt(0).toUpperCase() + category.slice(1),
        count
      };
    });
  }, []);

  // Filter menu items based on selected category
  const filteredItems = useMemo(() => 
    selectedCategory === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Enhanced Navigation Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-12 text-sm md:text-base"
          >
            <Link 
              href="/" 
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors rounded-md px-2 py-1 hover:bg-primary/10"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <ChevronRight className="text-foreground/60" size={16} />
            <span className="text-primary font-medium px-2 py-1">Our Delights</span>
          </motion.div>

          {/* Sticky Category Filter */}
          <div className={`sticky top-20 z-10 py-6 bg-background/95 backdrop-blur-sm transition-all duration-300 ${
            isSticky ? 'shadow-lg rounded-2xl px-4' : ''
          }`}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`min-w-[120px] font-medium transition-all duration-300 relative ${
                    selectedCategory === category.id 
                      ? 'scale-105 shadow-md' 
                      : 'hover:scale-105 hover:shadow-sm'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className={`absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 ${
                    selectedCategory === category.id ? 'scale-100' : 'scale-90'
                  } transition-transform`}>
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <Link 
                      href={`/menu/${item.id}`} 
                      className="block group/link"
                    >
                      <h2 className="text-xl font-bold mb-2 group-hover/link:text-primary transition-colors">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="text-foreground/80 mb-4 line-clamp-2 text-sm sm:text-base">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      <InstagramOrderButton size="sm" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-foreground/80">No items found in this category.</p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory('all')}
                className="mt-4 hover:scale-105 transition-transform"
              >
                View All Items
              </Button>
            </motion.div>
          )}

          {/* Instagram Feed Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24"
          >
            <InstagramFeed />
          </motion.div>

          {/* Floating Back to Top Button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed bottom-8 right-8 z-50"
              >
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
                >
                  <ArrowUp size={20} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}