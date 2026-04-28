'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

interface EnvStatus {
  STRIPE_SECRET_KEY: boolean;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: boolean;
  STRIPE_WEBHOOK_SECRET: boolean;
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);
  const [envLoading, setEnvLoading] = useState(true);

  // Check env vars
  useEffect(() => {
    // Client-side checks
    console.log(
      '[ENV CHECK] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:',
      stripePublishableKey ? '✅ SET' : '❌ MISSING'
    );

    // Server-side checks via API
    fetch('/api/stripe/check-env')
      .then(async (res) => {
        const data = await res.json();
        // Override the publishable key check with actual client-side value
        data.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = !!stripePublishableKey;

        console.log('[ENV CHECK] STRIPE_SECRET_KEY:', data.STRIPE_SECRET_KEY ? '✅ SET' : '❌ MISSING');
        console.log('[ENV CHECK] STRIPE_WEBHOOK_SECRET:', data.STRIPE_WEBHOOK_SECRET ? '✅ SET' : '❌ MISSING');

        setEnvStatus(data);
      })
      .catch(() => {
        setEnvStatus({
          STRIPE_SECRET_KEY: false,
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!stripePublishableKey,
          STRIPE_WEBHOOK_SECRET: false,
        });
      })
      .finally(() => {
        setEnvLoading(false);
      });
  }, []);

  const allEnvSet = envStatus
    ? envStatus.STRIPE_SECRET_KEY && envStatus.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : false;

  // Create payment intent only when env is confirmed OK
  useEffect(() => {
    if (envLoading || !allEnvSet) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 2900, // $29.00 in cents
        currency: 'usd',
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [envLoading, allEnvSet]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Velocity</span>
            </a>
            <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Env Status Banner */}
        {!envLoading && envStatus && (
          <div className="mb-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Environment Variables Status</h3>
            <div className="space-y-3">
              <EnvRow
                name="NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
                isSet={envStatus.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                required
              />
              <EnvRow
                name="STRIPE_SECRET_KEY"
                isSet={envStatus.STRIPE_SECRET_KEY}
                required
              />
              <EnvRow
                name="STRIPE_WEBHOOK_SECRET"
                isSet={envStatus.STRIPE_WEBHOOK_SECRET}
                required={false}
              />
            </div>
            {!allEnvSet && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>⚠️ Required env vars are missing.</strong> The payment button is disabled until{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">STRIPE_SECRET_KEY</code> and{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{' '}
                  are set.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Complete your purchase</h1>
            <p className="mt-2 text-gray-600">You&apos;re one step away from supercharging your workflow.</p>

            <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Order Summary</h3>

              <div className="mt-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">Velocity Pro Plan</h4>
                  <p className="text-sm text-gray-500 mt-1">Monthly subscription per seat</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">$29.00</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <ul className="space-y-2">
                  {[
                    'Unlimited team members',
                    '50 GB storage',
                    'Priority support',
                    'Advanced analytics',
                    'Unlimited builds',
                    'Custom domains',
                    'SSO & RBAC',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-gray-900">$29.00</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secured by Stripe. Your payment information is encrypted.
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Details</h3>

              {(loading || envLoading) && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-3 text-sm text-gray-500">Preparing checkout...</p>
                </div>
              )}

              {!loading && !envLoading && !allEnvSet && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Stripe not fully configured</p>
                  <p className="mt-1 text-sm text-gray-500 text-center max-w-xs">
                    Set the required environment variables above to enable payments.
                  </p>
                  <button
                    disabled
                    className="mt-6 w-full px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Pay $29.00
                  </button>
                </div>
              )}

              {error && !loading && allEnvSet && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-red-800">Payment setup failed</p>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {clientSecret && stripePromise && allEnvSet && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#4f46e5',
                        borderRadius: '8px',
                        fontFamily: 'system-ui, sans-serif',
                      },
                    },
                  }}
                >
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvRow({ name, isSet, required }: { name: string; isSet: boolean; required: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-800">{name}</code>
        {required && (
          <span className="text-xs font-medium text-red-500">required</span>
        )}
        {!required && (
          <span className="text-xs font-medium text-gray-400">optional</span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {isSet ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-green-700">Set</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs font-medium text-red-700">Missing</span>
          </>
        )}
      </div>
    </div>
  );
}
