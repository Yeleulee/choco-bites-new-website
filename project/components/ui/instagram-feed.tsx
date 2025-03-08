"use client"

import { Instagram, RefreshCcw, Heart, MessageCircle, Image as ImageIcon, Loader2, Play } from 'lucide-react';
import Script from 'next/script';
import { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import Image from 'next/image';

const INSTAGRAM_POSTS = [
  {
    url: "https://www.instagram.com/p/DF4vlC_tZfP/",
    fallbackImage: "/images/cookies/chocolate-chip.jpg",
    caption: "Fresh chocolate chip cookies hot from the oven! 🍪✨",
    likes: "2.4k",
    comments: "156",
    type: "video"
  },
  {
    url: "https://www.instagram.com/p/DFKUccpojRe/",
    fallbackImage: "/images/cookies/double-chocolate.jpg",
    caption: "Double chocolate delight - perfect with milk! 🥛🍫",
    likes: "3.1k",
    comments: "203",
    type: "video"
  },
  {
    url: "https://www.instagram.com/p/DEw40pkNQQB/",
    fallbackImage: "/images/cookies/white-chocolate.jpg",
    caption: "White chocolate macadamia - a customer favorite! 🥜",
    likes: "1.8k",
    comments: "142",
    type: "image"
  }
];

function InstagramPost({ post, isLoaded, onLoad }: { 
  post: typeof INSTAGRAM_POSTS[0], 
  isLoaded: boolean,
  onLoad: () => void 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting && !isLoaded) {
            // Slight delay to ensure proper initialization
            setTimeout(() => onLoad(), 100);
          }
        });
      },
      { 
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '50px 0px'
      }
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => observer.disconnect();
  }, [onLoad, isLoaded]);

  return (
    <div 
      ref={postRef}
      className={`bg-background rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative">
        {/* Fallback Image */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={post.fallbackImage}
            alt={post.caption}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? 'opacity-40' : 'opacity-20'
          }`} />
          
          {/* Loading Indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
              {post.type === 'video' ? (
                <div className="relative">
                  <Loader2 size={48} className="animate-spin" />
                  <Play size={24} className="absolute inset-0 m-auto" />
                </div>
              ) : (
                <Loader2 size={32} className="animate-spin" />
              )}
              <p className="text-sm font-medium">Loading {post.type === 'video' ? 'Video' : 'Post'}...</p>
            </div>
          )}

          {/* Engagement Preview */}
          <div className={`absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <div className="flex flex-col gap-2">
              <p className="text-white text-sm line-clamp-2">{post.caption}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-white">
                  <Heart size={16} className="fill-white" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <MessageCircle size={16} />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Instagram Embed */}
        <div className={`transition-opacity duration-700 ${
          isLoaded && isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={post.url}
            data-instgrm-version="14"
            data-instgrm-captioned="true"
            data-instgrm-autoplay="true"
            data-instgrm-playsinline="true"
            style={{ 
              maxWidth: '540px',
              width: '100%',
              margin: '0',
              padding: '0',
              background: 'transparent'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function InstagramFeed() {
  const [loadedPosts, setLoadedPosts] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const initAttempts = useRef(0);

  // Process embeds when they come into view
  const processEmbed = (postUrl: string) => {
    try {
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
        setLoadedPosts(prev => Array.from(new Set([...prev, postUrl])));
      } else if (initAttempts.current < 3) {
        // Retry initialization if Instagram embed is not ready
        initAttempts.current += 1;
        setTimeout(() => processEmbed(postUrl), 1000);
      }
    } catch (error) {
      console.error('Failed to process embed:', error);
    }
  };

  // Initialize Instagram embed script
  const initializeEmbeds = () => {
    try {
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
        setIsInitializing(false);
      }
    } catch (error) {
      console.error('Failed to initialize embeds:', error);
      setHasError(true);
      setIsInitializing(false);
    }
  };

  // Retry loading embeds
  const retryLoad = () => {
    setLoadedPosts([]);
    setHasError(false);
    setIsInitializing(true);
    initializeEmbeds();
  };

  return (
    <div className="w-full py-12 bg-background/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Instagram size={32} className={`text-primary ${isInitializing ? 'animate-pulse' : ''}`} />
          <h2 className="text-3xl font-bold">Latest from Instagram</h2>
        </div>

        {/* Instagram Feed Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {INSTAGRAM_POSTS.map((post) => (
              <InstagramPost 
                key={post.url} 
                post={post} 
                isLoaded={loadedPosts.includes(post.url)}
                onLoad={() => processEmbed(post.url)}
              />
            ))}
          </div>

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-xl">
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <p className="text-foreground/80">Failed to load Instagram posts</p>
                <Button 
                  variant="outline"
                  onClick={retryLoad}
                  className="flex items-center gap-2"
                >
                  <RefreshCcw size={16} />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Instagram Follow Button */}
        <div className="flex justify-center mt-12">
          <a
            href="https://instagram.com/chocobites"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-md hover:shadow-xl"
          >
            <Instagram size={24} className="group-hover:scale-110 transition-transform" />
            <span className="relative">
              <span className="block">Follow @chocobites</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-foreground/30 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </span>
          </a>
        </div>

        {/* Instagram Embed Script */}
        <Script 
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={initializeEmbeds}
          onError={() => {
            setHasError(true);
            setIsInitializing(false);
          }}
        />
      </div>
    </div>
  );
}