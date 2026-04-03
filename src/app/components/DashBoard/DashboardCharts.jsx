'use client'
import React from 'react';
import { 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaHourglassHalf,
  FaChartLine,
  FaChartBar
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardCharts =  ({ bookings, session }) => {

  // Calculate statistics
  const stats = {
    total: bookings?.length || 0,
    pending: bookings?.filter(b => b.status === 'pending').length || 0,
    completed: bookings?.filter(b => b.status === 'completed').length || 0,
    cancelled: bookings?.filter(b => b.status === 'cancelled').length || 0,
    totalSpent: bookings?.reduce((sum, b) => sum + (b.totalAmount || 0), 0) || 0
  };

  // Category wise booking data for Pie Chart
  const categoryData = {};
  bookings?.forEach(booking => {
    const category = booking.category;
    categoryData[category] = (categoryData[category] || 0) + 1;
  });

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  // Using your theme colors
  const COLORS = ['#4F46E5', '#06B6D4', '#F97316', '#3B82F6', '#22C55E', '#F59E0B'];

  // Monthly booking data
  const getMonthlyData = () => {
    const months = {};
    const last6Months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      months[monthName] = 0;
      last6Months.push(monthName);
    }
    
    bookings?.forEach(booking => {
      const bookingDate = new Date(booking.serviceDate);
      const monthName = bookingDate.toLocaleString('default', { month: 'short' });
      if (months[monthName] !== undefined) {
        months[monthName]++;
      }
    });
    
    return last6Months.map(month => ({
      month,
      bookings: months[month],
      revenue: bookings?.filter(b => 
        new Date(b.serviceDate).toLocaleString('default', { month: 'short' }) === month
      ).reduce((sum, b) => sum + (b.totalAmount || 0), 0) || 0
    }));
  };

  // Status data for Bar Chart
  const statusData = [
    { name: 'Pending', value: stats.pending },
    { name: 'Completed', value: stats.completed },
    { name: 'Cancelled', value: stats.cancelled }
  ];

  // Weekly booking data
  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = days.map(day => ({ day, bookings: 0 }));
    
    bookings?.forEach(booking => {
      const bookingDate = new Date(booking.serviceDate);
      const dayName = days[bookingDate.getDay()];
      const dayData = weeklyData.find(d => d.day === dayName);
      if (dayData) {
        dayData.bookings++;
      }
    });
    
    return weeklyData;
  };

  const weeklyData = getWeeklyData();
  const monthlyData = getMonthlyData();

  // Custom Tooltip with theme colors
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 p-3 shadow-lg rounded-box border border-base-300">
          <p className="font-semibold text-base-content">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-sm text-base-content/70">
              {p.name}: {p.value} {p.name === 'Revenue' ? '৳' : 'bookings'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container-custom py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
            Dashboard
          </h1>
          <p className="text-base-content/60">
            Welcome back, {session?.user?.name || session?.user?.email}
          </p>
        </div>

        {/* Statistics Cards - Using theme colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-xs">Total Bookings</p>
                  <p className="text-2xl font-bold text-primary mt-1">{stats.total}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-xl">
                  <FaCalendarAlt className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-xs">Pending</p>
                  <p className="text-2xl font-bold text-warning mt-1">{stats.pending}</p>
                </div>
                <div className="bg-warning/10 p-2 rounded-xl">
                  <FaHourglassHalf className="w-5 h-5 text-warning" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-xs">Completed</p>
                  <p className="text-2xl font-bold text-success mt-1">{stats.completed}</p>
                </div>
                <div className="bg-success/10 p-2 rounded-xl">
                  <FaCheckCircle className="w-5 h-5 text-success" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-xs">Cancelled</p>
                  <p className="text-2xl font-bold text-error mt-1">{stats.cancelled}</p>
                </div>
                <div className="bg-error/10 p-2 rounded-xl">
                  <FaTimesCircle className="w-5 h-5 text-error" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base-content/60 text-xs">Total Spent</p>
                  <p className="text-xl font-bold text-accent mt-1">৳ {stats.totalSpent}</p>
                </div>
                <div className="bg-accent/10 p-2 rounded-xl">
                  <FaMoneyBillWave className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Monthly Trend - Area Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-primary" />
                <h2 className="text-xl font-bold text-base-content">Booking Trend</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#4F46E5" 
                    fillOpacity={1} 
                    fill="url(#colorBookings)" 
                    name="Bookings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution - Pie Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaChartBar className="text-primary" />
                <h2 className="text-xl font-bold text-base-content">Service Categories</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Status Overview - Bar Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-primary" />
                <h2 className="text-xl font-bold text-base-content">Booking Status</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Bookings">
                    <Cell fill="#F59E0B" /> {/* Pending - Warning */}
                    <Cell fill="#22C55E" /> {/* Completed - Success */}
                    <Cell fill="#EF4444" /> {/* Cancelled - Error */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Booking Pattern - Line Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-primary" />
                <h2 className="text-xl font-bold text-base-content">Weekly Pattern</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    dot={{ fill: '#06B6D4', strokeWidth: 2 }}
                    name="Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue Trend - Line Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FaMoneyBillWave className="text-primary" />
              <h2 className="text-xl font-bold text-base-content">Revenue Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  dot={{ fill: '#F97316', strokeWidth: 2 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;