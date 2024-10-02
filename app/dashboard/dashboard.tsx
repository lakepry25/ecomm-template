'use client';

import { useState } from "react";

import Navigation from "./navigation";
import Products from "./products";

export default function Dashboard() {
  const [selectedNavItem, setSelectedNavItem] = useState("dashboard");

  const handleNavSelection = (selected: string) => {
    setSelectedNavItem(selected);
  };

  return (
    <div className="h-full w-full flex">
      <Navigation selectedNavItem="dashboard" onSelect={handleNavSelection}/>
      
      {selectedNavItem === "dashboard" ? (
        <h1>Home</h1>
      ) : selectedNavItem === "products" ? (
        <Products />
      ) : null}
    </div>
  );
}