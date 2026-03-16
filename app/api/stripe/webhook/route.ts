import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id

    if (userId && session.payment_status === 'paid') {
      // Use admin client — webhook has no cookies/session, so we need service role to bypass RLS
      const supabase = createAdminClient()
      await supabase
        .from('profiles')
        .update({
          has_paid: true,
          stripe_payment_intent_id: session.payment_intent as string,
          payment_date: new Date().toISOString(),
        })
        .eq('id', userId)
    }
  }

  return NextResponse.json({ received: true })
}
