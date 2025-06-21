import { ShoppingCart, Star, Clock, MapPin } from "lucide-react";

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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function RestaurantPortfolio({
  onBack,
  onDashboard,
  cart,
  addToCart,
  onViewCart,
  userProfile,
}: {
  onBack: () => void;
  onDashboard: () => void;
  cart: CartItem[];
  addToCart: (item: any) => void;
  onViewCart: () => void;
  userProfile: UserProfile | null;
}) {
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, basil, and San Marzano tomatoes",
      price: "$18",
      image:
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Pizza",
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
    },
    {
      id: 4,
      name: "Beef Tenderloin",
      description:
        "Prime cut beef with roasted garlic, seasonal vegetables, and red wine reduction",
      price: "$42",
      image:
        "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Meat",
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
    },
  ];

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={onBack}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Back
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={onViewCart}
                className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={onDashboard}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Manage Portfolio
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Restaurant Header */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {userProfile?.restaurantName || "Bella Vista Restaurant"}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {userProfile?.description ||
                  "Authentic Italian cuisine in the heart of the city. Experience traditional recipes passed down through generations."}
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.9 (234 reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>30-45 min</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>
                    {userProfile?.address?.split(",")[1] || "Downtown"}
                  </span>
                </div>
              </div>
              <button
                onClick={onViewCart}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Order Online
              </button>
            </div>
            <div>
              <img
                src={
                  userProfile?.image ||
                  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt="Restaurant interior"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-orange-600">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
