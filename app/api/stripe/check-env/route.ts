import { NextResponse } from 'next/server';

export async function GET() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const envStatus = {
    STRIPE_SECRET_KEY: !!stripeSecretKey,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: true, // checked client-side
    STRIPE_WEBHOOK_SECRET: !!stripeWebhookSecret,
  };

  // Log server-side env status
  console.log('[ENV CHECK] STRIPE_SECRET_KEY:', stripeSecretKey ? '✅ SET' : '❌ MISSING');
  console.log('[ENV CHECK] STRIPE_WEBHOOK_SECRET:', stripeWebhookSecret ? '✅ SET' : '❌ MISSING');

  return NextResponse.json(envStatus);
}
