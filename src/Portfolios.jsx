import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { RestaurantPortfolio } from "./components/RestaurantPortfolio.tsx";
import { CartView } from "./components/CartView.tsx";
import { CheckoutView } from "./components/CheckoutView.tsx";
import { OrderSuccess } from "./components/OrderSuccess.tsx";
import { Dashboard } from "./components/Dashboard.tsx";

function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [currentView, setCurrentView] = useState("landing");
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/portfolios`)
      .then((res) => res.json())
      .then((data) => setPortfolios(data))
      .catch((err) => console.error("Failed to load portfolios", err));
  }, []);

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
  if (currentView === "portfolio") {
    return (
      <RestaurantPortfolio
        onBack={() => {
          setSelectedPortfolio(null);
          setCurrentView("landing");
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
  if (currentView === "dashboard") {
    return (
      <Dashboard
        onBack={() => setCurrentView("portfolio")}
        userProfile={selectedPortfolio}
      />
    );
  }

  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <a
            href="/"
            className="text-orange-600 text-xl border-2 border-orange-500 rounded-md pl-2 pr-4 hover:text-orange-700 font-medium"
          >
            ← Back
          </a>
          <div className="w-full flex flow-row items-center justify-center max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
              Restaurant Portfolios
            </h1>
          </div>

          {portfolios.length === 0 ? (
            <p className="text-gray-500">No portfolios found.</p>
          ) : (
            <div className="space-y-6">
              {portfolios.map((p) => (
                <div
                  key={p._id?.$oid || p._id}
                  className="bg-white shadow-md hover:shadow-lg transition-shadow border border-orange-100 rounded-xl overflow-hidden flex flex-col sm:flex-row cursor-pointer"
                  onClick={() => {
                    setSelectedPortfolio(p);
                    setCurrentView("portfolio");
                  }}
                >
                  {/* Image */}
                  <div className="w-full sm:w-1/3 h-64 sm:h-auto">
                    <img
                      src={p.image}
                      alt={p.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-2xl font-bold text-orange-600 mb-1">
                        {p.restaurantName}
                      </h2>
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Cuisine:</span>{" "}
                        {p.cuisine}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <span className="font-medium">Owner:</span> {p.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(
                          p.createdAt?.$date || p.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button className="inline-flex items-center text-orange-600 font-medium hover:underline">
                        View Portfolio
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Portfolios;
