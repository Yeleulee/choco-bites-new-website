import { Button } from "@/components/ui/button";
import Image from "next/image";

interface InstagramOrderButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

export function InstagramOrderButton({ 
  className = "", 
  size = "default",
  variant = "default"
}: InstagramOrderButtonProps) {
  const handleInstagramOrder = () => {
    window.open("https://www.instagram.com/c_hoco_bites/", "_blank");
  };

  // Define icon sizes based on button size
  const iconSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;
  
  return (
    <Button
      onClick={handleInstagramOrder}
      className={`flex items-center gap-2 hover:scale-105 transition-transform ${className}`}
      size={size}
      variant={variant}
    >
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        <Image
          src="https://img.icons8.com/?size=100&id=ZRiAFreol5mE&format=png&color=000000"
          alt="Instagram"
          width={iconSize}
          height={iconSize}
          className="object-contain"
        />
      </div>
      <span className={`${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"}`}>
        Order Now
      </span>
    </Button>
  );
} 