import 'server-only'
import Stripe from 'stripe'

// ** create this page in lib folder for strip key



export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)