"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { menuItems, Product } from '@/lib/menu-data';
import { motion } from 'framer-motion';
import { OrderButton } from '@/components/ui/order-button';
import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';

export default function MenuItemPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const item = menuItems.find(item => item.id === parseInt(params.id));
    setProduct(item || null);
  }, [params.id]);

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              <p className="text-lg text-foreground/80">{product.longDescription}</p>

              {/* Ingredients */}
              {product.ingredients && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                  <ul className="list-disc list-inside text-foreground/80">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutritional Info */}
              {product.nutritionalInfo && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Nutritional Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Calories</p>
                      <p>{product.nutritionalInfo.calories}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Protein</p>
                      <p>{product.nutritionalInfo.protein}g</p>
                    </div>
                    <div>
                      <p className="font-semibold">Carbs</p>
                      <p>{product.nutritionalInfo.carbs}g</p>
                    </div>
                    <div>
                      <p className="font-semibold">Fat</p>
                      <p>{product.nutritionalInfo.fat}g</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Allergens</h2>
                  <p className="text-foreground/80">Contains: {product.allergens.join(', ')}</p>
                </div>
              )}

              {/* Product Actions */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                  <OrderButton size="lg" className="luxury-button" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 