// src/app/components/about/About.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaCheckCircle,
  FaHome,
  FaHeadset,
  FaHeart,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-base-100">
      <div className="container-custom mx-auto px-4">
        {/* Hero / Intro Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-primary">Care.IO</span>
            </h1>
            <p className="text-xl md:text-2xl text-base-content/80 mb-8">
              We are dedicated to making caregiving simple, safe, and accessible for every family in Bangladesh.
            </p>
            <p className="text-lg mb-10 max-w-3xl">
              Our mission is to connect loving families with reliable, compassionate caregivers who provide personalized support at home — whether it's babysitting your little one, assisting elderly loved ones, or caring for those with special needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking" className="btn btn-primary btn-lg px-10">
                Book a Caregiver Today
              </Link>
              <Link href="/services" className="btn btn-outline btn-secondary btn-lg px-10">
                Explore Our Services
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/about.png"
              alt="Family caregiving - daughter supporting elderly mother at home"
              width={1200}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/40 to-transparent" />
          </div>
        </div>

        {/* Why Choose Care.IO - Stats / Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Families Trust Care.IO
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            We go beyond just providing care — we build peace of mind for families.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <FaCheckCircle className="text-5xl text-primary mb-4" />
              <h3 className="card-title text-2xl">Verified & Trained Caregivers</h3>
              <p className="text-base-content/70">
                All our caregivers undergo thorough background checks, training, and interviews to ensure safety and professionalism.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <FaHome className="text-5xl text-primary mb-4" />
              <h3 className="card-title text-2xl">Care at Your Home</h3>
              <p className="text-base-content/70">
                Personalized one-on-one care in the comfort and familiarity of your own home — no need to relocate loved ones.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body items-center text-center">
              <FaHeadset className="text-5xl text-primary mb-4" />
              <h3 className="card-title text-2xl">Round-the-Clock Support</h3>
              <p className="text-base-content/70">
                Our team is available anytime for emergencies, questions, or adjustments to care plans.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values / Story */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <ul className="space-y-6 text-lg">
              <li className="flex items-start gap-4">
                <FaHeart className="text-3xl text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-xl">Compassion First</h4>
                  <p className="text-base-content/70">
                    Every interaction is rooted in empathy, dignity, and genuine care.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaShieldAlt className="text-3xl text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-xl">Safety & Trust</h4>
                  <p className="text-base-content/70">
                    We prioritize rigorous screening and continuous monitoring.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaUsers className="text-3xl text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-xl">Family-Centered</h4>
                  <p className="text-base-content/70">
                    We work as an extension of your family, not just a service.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right image for values section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
            <Image
              src="/assets/about2.png" // change to your actual image path
              alt="Happy multi-generational family portrait"
              width={1200}
              height={800}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20 py-12 bg-base-200 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Peace of Mind?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of families who trust Care.IO for their loved ones' care.
          </p>
          <Link href="/booking" className="btn btn-primary btn-lg px-12">
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;