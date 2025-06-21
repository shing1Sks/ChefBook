import { useState } from "react";
import { Camera, Check } from "lucide-react";

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

export function MenuScanner({
  onBack,
  onComplete,
  userProfile,
}: {
  onBack: () => void;
  onComplete: () => void;
  userProfile: UserProfile | null;
}) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      setTimeout(() => onComplete(), 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 text-orange-600 hover:text-orange-700 font-medium flex items-center"
        >
          ← Back to Profile
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Menu Scanner
          </h1>
          <p className="text-xl text-gray-600">
            Upload or photograph your menu to get started
          </p>
          {userProfile && (
            <p className="text-lg text-orange-600 mt-2">
              Creating portfolio for {userProfile.restaurantName}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!scanned ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-orange-400 transition-colors">
              {scanning ? (
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Scanning Menu...
                    </h3>
                    <p className="text-gray-600">
                      AI is analyzing your menu items
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full animate-pulse"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Upload Your Menu
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Drag and drop your menu images or click to browse
                    </p>
                    <button
                      onClick={handleScan}
                      className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      Start Scanning
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Menu Scanned Successfully!
                </h3>
                <p className="text-gray-600">
                  Generating your restaurant portfolio...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
