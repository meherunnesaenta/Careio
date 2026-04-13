import { getAllPayment } from '@/actions/server/payment';
import Heading from '@/app/components/Heading/Heading';
import React from 'react';
import { 
  HiOutlineCreditCard, 
  HiOutlineCurrencyDollar, 
  HiOutlineCheckCircle, 
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineReceiptTax,
  HiOutlineMail,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlineSearch,
  HiOutlineFilter
} from 'react-icons/hi';
import { FaRegMoneyBillAlt, FaStripeS } from 'react-icons/fa';

const PaymentHistory = async () => {
  const payments = await getAllPayment();

  // Status badge component - Updated for 'paid' status
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      paid: {
        color: 'success',
        icon: <HiOutlineCheckCircle className="w-4 h-4" />,
        text: 'Paid',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-700 dark:text-green-400',
        borderColor: 'border-green-200 dark:border-green-800'
      },
      pending: {
        color: 'warning',
        icon: <HiOutlineClock className="w-4 h-4" />,
        text: 'Pending',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        borderColor: 'border-yellow-200 dark:border-yellow-800'
      },
      failed: {
        color: 'error',
        icon: <HiOutlineCreditCard className="w-4 h-4" />,
        text: 'Failed',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-700 dark:text-red-400',
        borderColor: 'border-red-200 dark:border-red-800'
      },
      refunded: {
        color: 'info',
        icon: <FaRegMoneyBillAlt className="w-4 h-4" />,
        text: 'Refunded',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-700 dark:text-blue-400',
        borderColor: 'border-blue-200 dark:border-blue-800'
      }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
      <div className={`badge gap-2 p-3 ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  // Payment method icon
  const PaymentMethodIcon = ({ method }) => {
    const methods = {
      stripe: { 
        icon: <FaStripeS className="w-5 h-5 text-[#635BFF]" />, 
        name: 'Stripe',
        bgColor: 'bg-[#635BFF]/10'
      },
      cash: { 
        icon: <HiOutlineCurrencyDollar className="w-5 h-5 text-green-600" />, 
        name: 'Cash',
        bgColor: 'bg-green-100'
      },
      bank: { 
        icon: <HiOutlineReceiptTax className="w-5 h-5 text-blue-600" />, 
        name: 'Bank Transfer',
        bgColor: 'bg-blue-100'
      }
    };
    const selected = methods[method?.toLowerCase()] || methods.stripe;
    
    return (
      <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${selected.bgColor}`}>
        {selected.icon}
        <span className="text-sm font-medium">{selected.name}</span>
      </div>
    );
  };

  // Format currency to BDT
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date properly
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get short ID (last 8 characters)
  const getShortId = (id) => {
    if (!id) return 'N/A';
    const idStr = id.toString();
    return idStr.slice(-8);
  };

  // Calculate statistics
  const totalPayments = payments?.length || 0;
  const totalAmount = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
  const completedPayments = payments?.filter(p => p.status?.toLowerCase() === 'paid').length || 0;
  const pendingPayments = payments?.filter(p => p.status?.toLowerCase() === 'pending').length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section with Gradient */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <Heading className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                💳 Payment History
              </Heading>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Track and manage all your payment transactions
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn btn-outline btn-sm gap-2">
                <HiOutlineDownload className="w-4 h-4" />
                Export
              </button>
              <button className="btn btn-primary btn-sm gap-2">
                <HiOutlineReceiptTax className="w-4 h-4" />
                New Payment
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-primary">
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Total Transactions</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{totalPayments}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-xl">
                  <HiOutlineCreditCard className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-success">
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Total Amount</p>
                  <h3 className="text-2xl font-bold text-success mt-1">{formatCurrency(totalAmount)}</h3>
                </div>
                <div className="bg-success/10 p-3 rounded-xl">
                  <HiOutlineCurrencyDollar className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500">
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Successful Payments</p>
                  <h3 className="text-2xl font-bold text-green-600 mt-1">{completedPayments}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                  <HiOutlineCheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-yellow-500">
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
                  <h3 className="text-2xl font-bold text-yellow-600 mt-1">{pendingPayments}</h3>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                  <HiOutlineClock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by Transaction ID, Service ID, or Email..." 
                className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700/50"
              />
            </div>
            <div className="flex gap-3">
              <select className="select select-bordered bg-gray-50 dark:bg-gray-700/50">
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <select className="select select-bordered bg-gray-50 dark:bg-gray-700/50">
                <option value="">All Methods</option>
                <option value="stripe">Stripe</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
              </select>
              <button className="btn btn-primary gap-2">
                <HiOutlineFilter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="text-xs font-semibold uppercase tracking-wider">Transaction ID</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">Service ID</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">User</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">Amount</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">Method</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">Date</th>
                  <th className="text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments && payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={payment._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td>
                        <div className="font-mono text-xs font-medium">
                          {getShortId(payment._id)}
                        </div>
                      </td>
                      <td>
                        <div className="font-mono text-xs text-gray-500">
                          {getShortId(payment.serviceId)}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-primary/10 text-primary rounded-full w-8">
                              <span className="text-xs">{payment.userId?.charAt(0)?.toUpperCase() || 'U'}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{payment.userId}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <HiOutlineMail className="w-3 h-3" />
                              {payment.userId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-primary">
                          {formatCurrency(payment.amount)}
                        </div>
                      </td>
                      <td>
                        <PaymentMethodIcon method={payment.paymentMethod} />
                      </td>
                      <td>
                        <StatusBadge status={payment.status} />
                      </td>
                      <td>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <HiOutlineCalendar className="w-3 h-3" />
                          {formatDate(payment.createdAt)}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-xs btn-ghost btn-info">
                            View
                          </button>
                          <button className="btn btn-xs btn-ghost">
                            <HiOutlinePrinter className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-16">
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full">
                          <HiOutlineCreditCard className="w-12 h-12 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-lg font-medium">No payment records found</p>
                          <p className="text-gray-400 text-sm mt-1">Start by making your first payment</p>
                        </div>
                        <button className="btn btn-primary mt-2">
                          Make a Payment
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {payments && payments.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, payments.length)}</span> of <span className="font-medium">{payments.length}</span> entries
              </div>
              <div className="join">
                <button className="join-item btn btn-sm btn-outline disabled:btn-disabled">«</button>
                <button className="join-item btn btn-sm btn-primary">1</button>
                <button className="join-item btn btn-sm btn-outline">2</button>
                <button className="join-item btn btn-sm btn-outline">3</button>
                <button className="join-item btn btn-sm btn-outline">»</button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity Summary */}
        {payments && payments.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <HiOutlineClock className="w-5 h-5 text-primary" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {payments.slice(0, 3).map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-sm font-medium">Payment {payment.status}</p>
                      <p className="text-xs text-gray-500">{formatDate(payment.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-gray-500">{payment.paymentMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;