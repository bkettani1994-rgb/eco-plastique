import type { CartItem } from "@/lib/cart-context";

export interface OrderCustomer {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  total: number;
  createdAt: string;
}

const STORAGE_KEY = "ecoplastique:last-order";

export function saveLastOrder(order: Order) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function getLastOrder(): Order | null {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Order;
  } catch {
    return null;
  }
}

export function clearLastOrder() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function generateOrderId(): string {
  return `EP-${Date.now().toString(36).toUpperCase()}`;
}
