import { useState } from "react";
import Tesseract from "tesseract.js";
import { Camera, Check } from "lucide-react";
import { generateMenuFromOCR } from "../utils/aiMenu.js"; // make sure this export is named

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
  onComplete: (parsedItems: any[]) => void; // pass extracted menu items!
  userProfile: UserProfile | null;
}) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleScan = async () => {
    if (!imageFile) return;

    setScanning(true);
    try {
      // STEP 1 — OCR
      const {
        data: { text },
      } = await Tesseract.recognize(imageFile, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      console.log("Raw OCR Text:", text);

      // STEP 2 — Gemini: clean structured menu
      const aiResult = await generateMenuFromOCR(text);
      console.log("Structured Menu from AI:", aiResult);

      setScanning(false);
      setScanned(true);

      // STEP 3 — pass final items
      setTimeout(() => {
        onComplete(aiResult.items || []); // use .items from your JSON structure
      }, 1500);
    } catch (err) {
      console.error("Error during scan + AI:", err);
      setScanning(false);
    }
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
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{progress}%</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Upload Your Menu
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Drag and drop your menu image or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block mx-auto mb-4"
                    />
                    <button
                      onClick={handleScan}
                      disabled={!imageFile}
                      className={`${
                        !imageFile
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      } text-white px-8 py-3 rounded-lg transition-colors font-medium`}
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
