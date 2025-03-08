import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface OrderButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

export function OrderButton({ 
  className = "", 
  size = "default",
  variant = "default"
}: OrderButtonProps) {
  const router = useRouter();

  const handleOrder = () => {
    router.push("/menu");
  };
  
  return (
    <Button
      onClick={handleOrder}
      className={`hover:scale-105 transition-transform ${className}`}
      size={size}
      variant={variant}
    >
      <span className={`${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"}`}>
        Order Now
      </span>
    </Button>
  );
} 