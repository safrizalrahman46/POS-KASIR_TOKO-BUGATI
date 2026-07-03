import { create } from 'zustand';
import type { CartItem } from '../types/order';

interface CartState {
  items: CartItem[];
  customerName: string;
  voucherCode: string;
  voucherDiscount: number;
  addItem: (product: { id: number; name: string; price: number; stock: number; image?: string }) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setCustomerName: (name: string) => void;
  setVoucherCode: (code: string) => void;
  setVoucherDiscount: (discount: number) => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  customerName: '',
  voucherCode: '',
  voucherDiscount: 0,

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.product_id === product.id);
    if (existing) {
      if (existing.quantity >= existing.stock) return;
      set({
        items: items.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [
          ...items,
          {
            product_id: product.id,
            product_name: product.name,
            price: product.price,
            quantity: 1,
            stock: product.stock,
            product_image: product.image || '',
          },
        ],
      });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product_id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.product_id === productId ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      ),
    });
  },

  clearCart: () => {
    set({ items: [], customerName: '', voucherCode: '', voucherDiscount: 0 });
  },

  setCustomerName: (name) => set({ customerName: name }),
  setVoucherCode: (code) => set({ voucherCode: code }),
  setVoucherDiscount: (discount) => set({ voucherDiscount: discount }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
