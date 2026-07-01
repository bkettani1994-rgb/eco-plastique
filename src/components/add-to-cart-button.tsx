"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/language-context";

interface AddToCartButtonProps {
  product: Product;
  variant?: "primary" | "outline";
  className?: string;
}

export function AddToCartButton({
  product,
  variant = "outline",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { t, tr } = useLang();
  const [isAdded, setIsAdded] = useState(false);

  function handleClick() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all",
        variant === "primary"
          ? "bg-primary text-white shadow-md hover:bg-primary-dark hover:shadow-lg"
          : "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        className,
      )}
    >
      {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
      {isAdded
        ? t("Ajouté au panier", tr.product_blocks.added)
        : t("Ajouter au panier", tr.product_blocks.add_to_cart)}
    </button>
  );
}
