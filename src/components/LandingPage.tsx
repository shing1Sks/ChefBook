import { Camera, ArrowRight, Star, Zap, Users, ChefHat } from "lucide-react";
import { FeatureCard } from "./FeatureCard.tsx";
import { StepCard } from "./StepCard.tsx";

export function LandingPage({
  onNavigate,
}: {
  onNavigate: (view: string) => void;
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
                {/* <img
                  src="../logo.png"
                  className="w-8 h-8 rounded-md"
                  // style={{
                  //   filter:
                  //     "brightness(1.1) sepia(1) hue-rotate(-10deg) saturate(11)",
                  // }}
                  alt=""
                /> */}
              </div>
              <span className="text-xl font-bold text-gray-900">ChefBook</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <button
                onClick={() => onNavigate("profile")}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Menu Into a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  {" "}
                  Digital Masterpiece
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Scan your menu and watch ChefBook create a stunning digital
                portfolio for your restaurant. AI-powered descriptions,
                professional images, and online ordering - all in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate("profile")}
                  className="bg-orange-600 text-white px-8 py-4 rounded-xl hover:bg-orange-700 transition-all transform hover:scale-105 font-semibold flex items-center justify-center group"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Create Your Portfolio
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate("portfolio")}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-orange-600 hover:text-orange-600 transition-colors font-semibold"
                >
                  View Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Restaurant interior"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="mt-4">
                  <h3 className="font-bold text-lg">Bella Vista Restaurant</h3>
                  <p className="text-gray-600">
                    Authentic Italian Cuisine with Modern Flair
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      4.9 (234 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From menu scanning to online orders, ChefBook provides all the
              tools to digitize your restaurant
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Camera className="w-8 h-8" />}
              title="AI Menu Scanning"
              description="Simply photograph your menu and our AI extracts all dishes with descriptions"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Portfolio"
              description="Get a professional restaurant website generated in minutes, not weeks"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Online Ordering"
              description="Integrated ordering system lets customers order directly from your portfolio"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to transform your restaurant
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              step="1"
              title="Create Profile"
              description="Set up your restaurant profile with basic information"
            />
            <StepCard
              step="2"
              title="Scan Your Menu"
              description="Take photos of your menu pages using our intelligent scanner"
            />
            <StepCard
              step="3"
              title="AI Enhancement"
              description="Our AI creates compelling descriptions and sources professional food images"
            />
            <StepCard
              step="4"
              title="Go Live"
              description="Receive your custom link and start accepting online orders immediately"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of restaurants already using ChefBook to boost their
            online presence
          </p>
          <button
            onClick={() => onNavigate("profile")}
            className="bg-white text-orange-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-colors font-bold text-lg transform hover:scale-105"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
