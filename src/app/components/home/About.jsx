// components/home/About.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaSmile, 
  FaUserNurse, 
  FaCity, 
  FaStar, 
  FaGraduationCap, 
  FaHeadset, 
  FaHeart, 
  FaMoneyBillWave,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import Heading from '../Heading/Heading';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { label: 'Happy Families', value: '10K+', icon: FaSmile, color: 'text-primary' },
    { label: 'Expert Caregivers', value: '500+', icon: FaUserNurse, color: 'text-secondary' },
    { label: 'Cities Covered', value: '25+', icon: FaCity, color: 'text-accent' },
    { label: 'Years of Trust', value: '5+', icon: FaStar, color: 'text-yellow-500' },
  ];

  const features = [
    {
      title: 'Trained Professionals',
      description: 'All our caregivers undergo rigorous training and background checks.',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support for your peace of mind.',
      icon: FaHeadset,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Personalized Care',
      description: 'Customized care plans tailored to your family\'s unique needs.',
      icon: FaHeart,
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'Affordable Pricing',
      description: 'Quality care at prices that fit your budget.',
      icon: FaMoneyBillWave,
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <section className=" bg-base-100 overflow-hidden">
      <div className="container-custom">
        {/* Using the Heading component */}
        <Heading 
          badge="About Us"
          center={true}
          subText="Providing compassionate, professional care services for families across the nation. Your family's well-being is our top priority."
        >
          We Care About Your{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Loved Ones
          </span>
        </Heading>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/about2.png"
                alt="Caregiver with elderly person"
                width={600}
                height={300}
                className="w-full h-auto object-cover"
              />
              {/* Experience Badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-base-content/70">Years of</div>
                  <div className="text-sm font-semibold">Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content Tabs */}
          <div>
            <div className="flex gap-2 border-b border-base-300 mb-6">
              {[
                { id: 'mission', label: 'Our Mission' },
                { id: 'vision', label: 'Our Vision' },
                { id: 'story', label: 'Our Story' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? 'text-primary'
                      : 'text-base-content/60 hover:text-base-content'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4 text-base-content/80 leading-relaxed">
              {activeTab === 'mission' && (
                <div className="animate-fadeIn">
                  <p className="text-lg mb-4">
                    Our mission is to provide compassionate, reliable, and professional care services 
                    that enhance the quality of life for families across the nation.
                  </p>
                  <p>
                    We believe every individual deserves dignity, respect, and personalized attention. 
                    Through our network of trained caregivers, we're making quality care accessible to all.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="animate-fadeIn">
                  <p className="text-lg mb-4">
                    To become the most trusted and innovative care service provider, 
                    setting new standards in home healthcare across the country.
                  </p>
                  <p>
                    We envision a world where quality care is accessible to everyone, 
                    regardless of their location or financial situation.
                  </p>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="animate-fadeIn">
                  <p className="text-lg mb-4">
                    Founded in 2019, Care.io started with a simple idea - to connect families 
                    with compassionate caregivers who truly care.
                  </p>
                  <p>
                    What began as a small local service has grown into a trusted platform serving 
                    thousands of families, thanks to our dedicated team and innovative approach.
                  </p>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/30 group"
              >
                Learn More About Us
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-base-200 to-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Icon className={`w-12 h-12 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-base-content/70">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <Heading 
            center={true}
            subText="Discover what makes us the trusted choice for families nationwide"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Care.io?
            </span>
          </Heading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-base-200 rounded-2xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-base-content">
                    {feature.title}
                  </h4>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-base-300">
          <div className="flex items-center gap-2">
            <MdVerified className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold">100% Verified Caregivers</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="w-6 h-6 text-secondary" />
            <span className="text-sm font-semibold">ISO Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart className="w-6 h-6 text-accent" />
            <span className="text-sm font-semibold">5,000+ Happy Families</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default About;