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
  const [itemList, setItemList] = useState<any[]>([
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomatoes",
      price: "$18",
      image:
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Pizza",
      alert: false,
    },
    {
      id: 2,
      name: "Truffle Risotto",
      description:
        "Creamy Arborio rice with black truffle, parmesan, and wild mushrooms",
      price: "$28",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Pasta & Risotto",
      alert: false,
    },
    {
      id: 3,
      name: "Grilled Branzino",
      description:
        "Mediterranean sea bass with lemon herbs, roasted vegetables, and olive tapenade",
      price: "$32",
      image:
        "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Seafood",
      alert: false,
    },
    {
      id: 4,
      name: "Pork Tenderloin",
      description:
        "Prime cut pork with roasted garlic, seasonal vegetables, and red wine reduction",
      price: "$42",
      image:
        "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Meat",
      alert: false,
    },
    {
      id: 5,
      name: "Tiramisu",
      description:
        "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone",
      price: "$12",
      image:
        "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Desserts",
      alert: false,
    },
    {
      id: 6,
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce with parmesan, croutons, and house-made Caesar dressing",
      price: "$14",
      image:
        "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Salads",
      alert: false,
    },
  ]);

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
