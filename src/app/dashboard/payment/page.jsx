import { getPaymentByEmail } from '@/actions/server/payment';
import { getServerSession } from 'next-auth';
import React from 'react';

const PaymentPage = async () => {
    const session = await getServerSession();
    const user = session?.user;
    const response = await getPaymentByEmail(user?.email);
    
    const payments = response?.acknowledged ? response.payments : [];

    return (
        <div className="container-custom py-10 min-h-screen">
            {/* 👤 User Header */}
            <div className="flex items-center gap-4 mb-8 p-6 bg-base-200 rounded-box border border-base-300">
                <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-2">
                        <img src={user?.image} alt="profile" />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-sm opacity-70">{user?.email}</p>
                </div>
            </div>

            {/* 📊 Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="stat flex justify-center items-center bg-base-100 border border-base-300 rounded-box shadow-sm">
                    <div className="stat-title text-xs font-bold uppercase opacity-60">Total Transactions</div>
                    <div className="stat-value text-primary">{payments.length}</div>
                </div>
            </div>

            {/* 💳 Table Card */}
            <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200 text-base-content/70">
                            <tr>
                                <th>Transaction ID</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment._id.toString()} className="hover:bg-base-200/50 transition-colors">
                                        <td className="font-mono text-xs opacity-60">
                                            #{payment._id.toString().slice(-8).toUpperCase()}
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost font-bold text-[10px] uppercase">
                                                {payment.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="font-bold text-primary italic">
                                            ৳{payment.amount}
                                        </td>
                                        <td>
                                            <div className={`badge badge-sm font-bold ${
                                                payment.status === 'pending' ? 'badge-warning' : 'badge-success'
                                            }`}>
                                                {payment.status}
                                            </div>
                                        </td>
                                        <td className="text-sm opacity-80">
                                            {new Date(payment.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-16 opacity-40">
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl mb-2">📄</span>
                                            <p>No payment history available.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
