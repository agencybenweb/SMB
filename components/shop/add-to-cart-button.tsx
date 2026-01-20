"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Device } from "@prisma/client";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export function AddToCartButton({ device }: { device: Device }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(device);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            onClick={handleAdd}
            size="lg"
            className={`w-full text-lg h-14 shadow-lg shadow-primary/20 transition-all ${added ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
                }`}
        >
            {added ? (
                <>
                    <Check className="mr-2 h-5 w-5" /> Ajouté au devis
                </>
            ) : (
                <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au devis
                </>
            )}
        </Button>
    );
}
