import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json().catch(() => ({}));
    const effectivePriceId = priceId || process.env.STRIPE_PRICE_ID;
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured (STRIPE_SECRET_KEY missing)' },
        { status: 500 }
      );
    }

    if (!effectivePriceId) {
       return NextResponse.json(
        { error: 'Stripe Price ID is not configured (STRIPE_PRICE_ID missing)' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: effectivePriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/premium/cancel`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
