import { Check } from "lucide-react";

export function OrderSuccess({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your payment and your
            delicious meal is being prepared.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order #12345</p>
            <p className="text-sm text-gray-600">
              Estimated delivery: 30-45 minutes
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
