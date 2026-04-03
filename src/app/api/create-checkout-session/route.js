'use server';

import { createPayment } from "@/actions/server/payment";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(booking) {
  try {
    // Step 1: MongoDB te pending payment record banaw
    const paymentResult = await createPayment({
      serviceId: booking.serviceId || booking._id,
      userId: booking.userId,
      totalAmount: booking.totalAmount || booking.amount,
      paymentMethod: 'stripe',
    });

    if (!paymentResult.acknowledged) {
      return { success: false, message: paymentResult.message };
    }

    const paymentId = paymentResult.insertedId.toString();

    // Step 2: Stripe Checkout Session create
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: booking.serviceName || booking.title || 'Service Payment',
            },
            unit_amount: Math.round(Number(booking.totalAmount || booking.amount) * 100), // paisa e convert
          },
          quantity: 1,
        },
      ],
      metadata: {
        paymentId: paymentId,
        userId: booking.userId,
        serviceId: booking.serviceId || booking._id,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Important: Redirect directly from server action
    return { 
      success: true, 
      url: session.url 
    };

  } catch (error) {
    console.error('Checkout error:', error);
    return { 
      success: false, 
      message: error.message || 'Payment session create korte problem hoyeche' 
    };
  }
}