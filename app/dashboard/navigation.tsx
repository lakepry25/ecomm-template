'use client';

import { useState } from "react";

import {
  Home,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils";

export default function Navigation({ selectedNavItem, onSelect }: { selectedNavItem: string, onSelect: (selected: string) => void }) {
  const [selected, setSelected] = useState(selectedNavItem);

  const handleSelect = (name: string) => {
    setSelected(name);
    onSelect(name);
  }

  return (
    <nav className="h-screen min-w-[270px] flex flex-col bg-zinc-100/40 border">
      <div className="flex items-center px-6 h-16 border-b border-neutral-200 mb-4">
        <h2 className="font-bold text-xl">Brand Blink Solutions</h2>
      </div>
      <button onClick={() => handleSelect("dashboard")} className={cn(
                          "py-2 px-4 mx-2 rounded-lg flex items-center gap-3",
                          selected === "dashboard" ? "bg-gray-200/60 hover:bg-gray-200/90" : "text-zinc-600/85 hover:text-zinc-950"
                        )}><Home className="h-4 w-4" />Dashboard</button>
      <button onClick={() => handleSelect("products")} className={cn(
                          "py-2 px-4 mx-2 rounded-lg flex items-center gap-3",
                          selected === "products" ? "bg-gray-200/60 hover:bg-gray-200/90" : "text-zinc-600/85 hover:text-zinc-950"
                        )}><Package className="h-4 w-4" />Products</button>
      <button onClick={() => handleSelect("orders")} className={cn(
                          "py-2 px-4 mx-2 rounded-lg flex items-center gap-3",
                          selected === "orders" ? "bg-gray-200/60 hover:bg-gray-200/90" : "text-zinc-600/85 hover:text-zinc-950"
                        )}><ShoppingCart className="h-4 w-4" />Orders</button>
      <button onClick={() => handleSelect("customers")} className={cn(
                          "py-2 px-4 mx-2 rounded-lg flex items-center gap-3",
                          selected === "customers" ? "bg-gray-200/60 hover:bg-gray-200/90" : "text-zinc-600/85 hover:text-zinc-950"
                        )}><Users className="h-4 w-4" />Customers</button>
    </nav>
  );
}