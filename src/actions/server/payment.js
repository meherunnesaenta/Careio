'use server';
const { connect } = require("@/lib/dbconnect");
const { ObjectId } = require('mongodb')
const paymentCollection = await connect('payment');

export const createPayment = async (payload) => {
  const { serviceId, userId, totalAmount } = payload;

  const newPayment = {
    serviceId,
    userId,
    amount: Number(totalAmount),
    status: 'pending',
    createdAt: new Date(),
  };

  const result = await paymentCollection.insertOne(newPayment);

  return {
    acknowledged: true,
    insertedId: result.insertedId.toString(),
  };
};

export const getPaymentByEmail = async (userId) => {
  try {
    if (!userId) {
      return {
        acknowledged: false,
        message: 'User ID is required'
      };
    }
    console.log('Fetching payments for user ID:', userId);
    const payments = await paymentCollection.find({ userId }).toArray();
    console.log(payments);
    return {
      acknowledged: true,
      payments
    };
  } catch (error) {
    console.error(error);
    return {
      acknowledged: false,
      message: error.message || "Database error"
    };
  }
};


export const getPayStatus = async (serviceId) => {
  try {
    if (!serviceId) {
      return {
        acknowledged: false,
        message: 'Service ID is required'
      };
    }
    const payment = await paymentCollection.findOne({ serviceId });
    if (!payment) {
      return {
        acknowledged: false,
        message: 'Payment not found'
      };
    }
    return {
      acknowledged: true,
      status: payment.status
    };
  } catch (error) {
    console.error(error);
    return {
      acknowledged: false,
      message: error.message || "Database error"
    };
  }
};

export const updatePaymentStatus = async (sessionId) => {
  try {
    if (!sessionId) {
      return { success: false, message: 'Session ID required' };
    }

    // Stripe theke session details fetch koro
    const { stripe } = require('@/lib/stripe');
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      // Payment table e status update koro
      const paymentId = session.metadata.paymentId;
      const result = await paymentCollection.updateOne(
        { _id: new ObjectId(paymentId) },
        { 
          $set: { 
            status: 'paid',
            stripeSessionId: sessionId,
            updatedAt: new Date()
          } 
        }
      );
      
      if (result.modifiedCount > 0) {
        return { success: true, message: 'Payment status updated' };
      }
    }
    
    return { success: false, message: 'Payment not paid yet' };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, message: error.message };
  }
};