import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, PRICE_AMOUNT, PRICE_CURRENCY } from '@/lib/stripe'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const origin = new URL(request.url).origin

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: user.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: PRICE_CURRENCY,
          unit_amount: PRICE_AMOUNT,
          product_data: {
            name: 'Open EMDR – Lifetime Access',
            description: 'Unlimited EMDR sessions, forever. All protocols included.',
          },
        },
      },
    ],
    metadata: { user_id: user.id },
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?cancelled=true`,
  })

  return NextResponse.json({ url: session.url })
}
