import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export const PRICE_AMOUNT = 4900 // $49.00 in cents
export const PRICE_CURRENCY = 'usd'
