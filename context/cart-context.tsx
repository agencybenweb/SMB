"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Device } from "@prisma/client";

export type CartItem = {
    device: Device;
    quantity: number;
};

interface CartContextType {
    items: CartItem[];
    addItem: (device: Device) => void;
    removeItem: (deviceId: string) => void;
    updateQuantity: (deviceId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (device: Device) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.device.id === device.id);
            if (existing) {
                return prev.map((item) =>
                    item.device.id === device.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { device, quantity: 1 }];
        });
    };

    const removeItem = (deviceId: string) => {
        setItems((prev) => prev.filter((item) => item.device.id !== deviceId));
    };

    const updateQuantity = (deviceId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(deviceId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.device.id === deviceId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
