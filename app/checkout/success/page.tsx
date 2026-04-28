import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-gray-900">Payment Successful!</h1>
          <p className="mt-3 text-gray-600">
            Thank you for purchasing the Velocity Pro Plan. You&apos;re all set to start shipping faster.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-4 text-left">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Plan</span>
              <span className="font-semibold text-gray-900">Velocity Pro</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold text-gray-900">$29.00</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/"
              className="block w-full px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
