'use server';
const { connect } = require("@/lib/dbconnect");

const paymentCollection = await connect('payment');

export const createPayment = async (payload) => {
  try {
    const { serviceId, userId, totalAmount, paymentMethod = 'stripe' } = payload;

    if (!serviceId || !userId || !totalAmount) {
      return { 
        acknowledged: false, 
        message: 'Missing required fields' 
      };
    }

    const newPayment = {
      serviceId,
      userId,
      amount: Number(totalAmount),
      paymentMethod,
      status: 'paid',
      createdAt: new Date(),
      // stripeSessionId: null,   // pore webhook e add korbo
    };

    const result = await paymentCollection.insertOne(newPayment);
    
    return {
      acknowledged: true,
      insertedId: result.insertedId,
      message: "Payment record created successfully"
    };
  } catch (error) {
    console.error(error);
    return {
      acknowledged: false,
      message: error.message || "Database error"
    };
  }  
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


export const  getPayStatus =async (serviceId) => {
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