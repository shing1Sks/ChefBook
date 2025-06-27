import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantPortfolio } from "./components/RestaurantPortfolio.tsx";
import { CartView } from "./components/CartView.tsx";
import { CheckoutView } from "./components/CheckoutView.tsx";
import { OrderSuccess } from "./components/OrderSuccess.tsx";
import { Dashboard } from "./components/Dashboard.tsx";
import { useNavigate } from "react-router-dom";

function Portfolio() {
  const { restaurantName } = useParams();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [currentView, setCurrentView] = useState("portfolio");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch selected portfolio on mount
  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/get-portfolio/${restaurantName}`
        );
        if (!res.ok) throw new Error("Portfolio not found");
        const data = await res.json();
        setSelectedPortfolio(data);
      } catch (err) {
        console.error("Error loading portfolio:", err);
      }
    }
    fetchPortfolio();
  }, [restaurantName]);

  // Cart logic
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.name === item.name);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
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

  const updateCartQuantity = (name, quantity) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.name !== name));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.name === name ? { ...item, quantity } : item))
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // View switching
  if (!selectedPortfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading portfolio...
      </div>
    );
  }

  if (currentView === "cart") {
    return (
      <CartView
        cart={cart}
        updateQuantity={updateCartQuantity}
        onBack={() => setCurrentView("portfolio")}
        onCheckout={() => setCurrentView("checkout")}
      />
    );
  }

  if (currentView === "checkout") {
    return (
      <CheckoutView
        cart={cart}
        total={getTotalPrice()}
        onBack={() => setCurrentView("cart")}
        onComplete={() => setCurrentView("order-success")}
      />
    );
  }

  if (currentView === "order-success") {
    return <OrderSuccess onBack={() => setCurrentView("portfolio")} />;
  }

  if (currentView === "dashboard") {
    return (
      <Dashboard
        onBack={() => setCurrentView("portfolio")}
        userProfile={selectedPortfolio}
      />
    );
  }

  return (
    <RestaurantPortfolio
      onBack={() => {
        setSelectedPortfolio(null);
        setCurrentView("landing");
        navigate("/");
      }}
      onDashboard={() => setCurrentView("dashboard")}
      cart={cart}
      addToCart={addToCart}
      onViewCart={() => setCurrentView("cart")}
      userProfile={selectedPortfolio}
      itemList={selectedPortfolio.items}
    />
  );
}

export default Portfolio;
