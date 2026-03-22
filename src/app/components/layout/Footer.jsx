// components/Footer.tsx
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Footer Content */}
      <div className="footer sm:footer-horizontal p-10 max-w-7xl mx-auto">
        
        {/* Brand + Mission */}
        <aside className="flex justify-center items-center">  
            <Logo></Logo>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href="/service/baby-care" className="link link-hover">Baby Sitting</Link>
          <Link href="/service/elderly-care" className="link link-hover">Elderly Care</Link>
          <Link href="/service/special-care" className="link link-hover">Special Needs Care</Link>
          <Link href="/booking" className="link link-hover">Book Now</Link>
        </nav>

        {/* Company Links */}
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href="/about" className="link link-hover">About Us</Link>
          <Link href="/contact" className="link link-hover">Contact</Link>
          <Link href="/my-bookings" className="link link-hover">My Bookings</Link>
          <Link href="/faq" className="link link-hover">FAQ</Link>
        </nav>

        {/* Contact & Legal */}
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-accent" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-accent" />
            <span>+880 17XX-XXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-accent" />
            <span>support@care.io</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaTwitter /></a>
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaInstagram /></a>
            <a href="#" className="text-xl hover:text-primary transition-colors"><FaLinkedinIn /></a>
          </div>
        </nav>
      </div>

      {/* Bottom Bar - Copyright + Legal */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content border-t border-base-300">
        <aside>
          <p>© {new Date().getFullYear()} Care.IO - All rights reserved</p>
          <div className="flex gap-6 mt-2 text-sm">
            <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
            <Link href="/terms" className="link link-hover">Terms of Service</Link>
            <Link href="/refund" className="link link-hover">Refund Policy</Link>
          </div>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;