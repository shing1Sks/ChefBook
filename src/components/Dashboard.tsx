import { Menu } from "lucide-react";
import { StatCard } from "./StatCard.tsx";
import { MenuItemRow } from "./MenuItemRow.tsx";

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

export function Dashboard({
  onBack,
  userProfile,
}: {
  onBack: () => void;
  userProfile: UserProfile | null;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                ChefBook Dashboard
              </span>
            </div>
            <button
              onClick={onBack}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.name || "Restaurant Owner"}!
          </h1>
          <p className="text-gray-600">
            Manage your {userProfile?.restaurantName || "restaurant"} portfolio
            and orders
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-4 gap-6 mb-8">
            <StatCard title="Today's Orders" value="23" change="+12%" />
            <StatCard title="Menu Views" value="1,247" change="+8%" />
            <StatCard title="Revenue" value="$892" change="+15%" />
            <StatCard title="Rating" value="4.9" change="+0.1" />
          </div>

          {/* Menu Management */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Menu Items</h2>
            <div className="space-y-4">
              <MenuItemRow
                name="Margherita Pizza"
                price="$18"
                status="Active"
              />
              <MenuItemRow name="Truffle Risotto" price="$28" status="Active" />
              <MenuItemRow
                name="Grilled Branzino"
                price="$32"
                status="Active"
              />
              <MenuItemRow name="Beef Tenderloin" price="$42" status="Active" />
            </div>
            <button className="mt-6 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Add New Item
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-gray-900">Update Menu</h3>
                <p className="text-sm text-gray-600">Scan new menu items</p>
              </button>
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-gray-900">
                  Portfolio Settings
                </h3>
                <p className="text-sm text-gray-600">Customize your page</p>
              </button>
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-gray-900">Order Settings</h3>
                <p className="text-sm text-gray-600">Manage delivery options</p>
              </button>
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Track performance</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
