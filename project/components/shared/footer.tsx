import Link from 'next/link';
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <h3 className="playfair text-xl font-bold mb-4 hover:text-primary transition-colors">
                c_hoco_bites
              </h3>
            </Link>
            <p className="text-sm opacity-80">
              Crafting moments of pure delight.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu?category=cookies" className="hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/menu?category=brownies" className="hover:text-primary transition-colors">
                  Brownies
                </Link>
              </li>
              <li>
                <Link href="/menu?category=special-packs" className="hover:text-primary transition-colors">
                  Special Packs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <a 
              href="https://www.instagram.com/c_hoco_bites/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              Follow us on Instagram
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-foreground/10 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} c_hoco_bites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 