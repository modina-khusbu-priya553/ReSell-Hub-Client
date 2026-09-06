import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';



export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

// get price from form data
    const formData = await request.formData()

// user info
    const userSession = await auth.api.getSession({
    headers: await headers()
   }) 

   const user = userSession?.user;


    const price = Number(formData.get('price'));
    const productId = formData.get('productId');
    const title = formData.get('title');
    const image = formData.get('image');
    const quantity = Number(formData.get('quantity')) || 1;

// Buyer info
    const buyerId = user?.id;
    const buyerName = user?.name;
    const buyerEmail = user?.email;



// seller info
    const sellerId = formData.get('sellerId');
    const sellerName = formData.get('sellerName');
    const sellerEmail = formData.get('sellerEmail');




    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: buyerEmail,
        line_items: [
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: title,
                    images: [image],
                },
                unit_amount: Number(price) * 100, // Convert to cents
            },          
            quantity: quantity,
        },
      ],
      metadata: {
        buyerId: buyerId,
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        sellerId: sellerId,
        sellerName: sellerName,
        sellerEmail: sellerEmail,
        productId: productId,
      },

// ** change mode and path upto success_id
      mode: 'payment',
      success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}