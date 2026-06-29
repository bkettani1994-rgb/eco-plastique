"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ecoplastique:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.slug === item.slug);
      if (existing) {
        return current.map((entry) =>
          entry.slug === item.slug
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        );
      }
      return [...current, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((entry) => entry.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((entry) => entry.slug !== slug);
      }
      return current.map((entry) => (entry.slug === slug ? { ...entry, quantity } : entry));
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, entry) => total + entry.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, entry) => total + entry.price * entry.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
