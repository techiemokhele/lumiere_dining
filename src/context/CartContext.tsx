"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  excerpt: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  promoApplied: boolean;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  discount: number;
  kitchenNotes: string;
  setKitchenNotes: (notes: string) => void;
}

const CART_KEY = "lumiere-cart";
const PROMO_KEY = "lumiere-promo";
const NOTES_KEY = "lumiere-notes";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [kitchenNotes, setKitchenNotesState] = useState<string>("");
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setItems(loadFromStorage<CartItem[]>(CART_KEY, []));
    setPromoApplied(loadFromStorage<boolean>(PROMO_KEY, false));
    setKitchenNotesState(loadFromStorage<string>(NOTES_KEY, ""));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(PROMO_KEY, JSON.stringify(promoApplied));
  }, [promoApplied, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(NOTES_KEY, JSON.stringify(kitchenNotes));
  }, [kitchenNotes, hydrated]);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoApplied(false);
    setKitchenNotesState("");
  }, []);

  const applyPromo = useCallback((code: string): boolean => {
    if (code.length >= 1) {
      setPromoApplied(true);
      return true;
    }
    return false;
  }, []);

  const removePromo = useCallback(() => {
    setPromoApplied(false);
  }, []);

  const setKitchenNotes = useCallback((notes: string) => {
    setKitchenNotesState(notes);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );
  const discount = promoApplied ? subtotal * 0.25 : 0;
  const discountedSubtotal = subtotal - discount;
  const tax = discountedSubtotal * 0.08;
  const serviceCharge = discountedSubtotal * 0.15;
  const total = discountedSubtotal + tax + serviceCharge;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        tax,
        serviceCharge,
        total,
        promoApplied,
        applyPromo,
        removePromo,
        discount,
        kitchenNotes,
        setKitchenNotes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
