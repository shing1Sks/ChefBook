import React, { useState } from "react";
import { ProfileSetup } from "./components/ProfileSetup.tsx";
import { MenuScanner } from "./components/MenuScanner.tsx";
import { RestaurantPortfolio } from "./components/RestaurantPortfolio.tsx";
import { CartView } from "./components/CartView.tsx";
import { CheckoutView } from "./components/CheckoutView.tsx";
import { OrderSuccess } from "./components/OrderSuccess.tsx";
import { Dashboard } from "./components/Dashboard.tsx";
import { LandingPage } from "./components/LandingPage.tsx";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  restaurantName: string;
  cuisine: string;
  description: string;
  image: string;
}

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [itemList, setItemList] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          price: parseFloat(item.price.replace("$", "")),
        },
      ];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderView = () => {
    switch (currentView) {
      case "profile":
        return (
          <ProfileSetup
            onComplete={(profile) => {
              setUserProfile(profile);
              setCurrentView("scanner");
            }}
            onBack={() => setCurrentView("landing")}
          />
        );
      case "scanner":
        return (
          <MenuScanner
            onBack={() => setCurrentView("profile")}
            onComplete={(parsedItems: any[]) => {
              setItemList(parsedItems);
              setCurrentView("portfolio");
            }}
            userProfile={userProfile}
          />
        );
      case "portfolio":
        return (
          <RestaurantPortfolio
            onBack={() => setCurrentView("landing")}
            onDashboard={() => setCurrentView("dashboard")}
            cart={cart}
            addToCart={addToCart}
            onViewCart={() => setCurrentView("cart")}
            userProfile={userProfile}
            itemList={itemList}
          />
        );
      case "cart":
        return (
          <CartView
            cart={cart}
            updateQuantity={updateCartQuantity}
            onBack={() => setCurrentView("portfolio")}
            onCheckout={() => setCurrentView("checkout")}
          />
        );
      case "checkout":
        return (
          <CheckoutView
            cart={cart}
            total={getTotalPrice()}
            onBack={() => setCurrentView("cart")}
            onComplete={() => setCurrentView("order-success")}
          />
        );
      case "order-success":
        return <OrderSuccess onBack={() => setCurrentView("portfolio")} />;
      case "dashboard":
        return (
          <Dashboard
            onBack={() => setCurrentView("portfolio")}
            userProfile={userProfile}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return <div className="min-h-screen bg-white">{renderView()}</div>;
}

export default App;
